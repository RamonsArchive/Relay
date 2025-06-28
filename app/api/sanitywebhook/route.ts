import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WebhookPayload, DatabaseVariantType } from "@/globalTypes";
import { parseServerActionResponse } from "@/lib/utils";
import {isValidSignature} from '@sanity/webhook'

export async function POST(request: NextRequest) {

  const secret = process.env.SANITY_WEBHOOK_SECRET as string;
  const signature = request.headers.get("sanity-webhook-signature") || "";
  const body = await request.text(); // read boyd into a string.

  // validate the signature
  if (!(isValidSignature(body, signature, secret))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  
  const payload = JSON.parse(body);
  // record the sync operation
  const payloadId = payload._id.replace(/^drafts\./, '');
  const syncRecord = await prisma.sanitySync.create({
    data: {
        documentId: payloadId,
        documentType: payload._type,
        operation: request.headers.get("sanity-operation") || "",
        revisionId: payload._rev,
        status: "pending",
        payload: payload,
    }
  })

  // proccess the product sync
  const result = await syncProductFromSanity(payload, payloadId, syncRecord.id);
  if (result.status) {
    return NextResponse.json({status: 200, message: "Product synced successfully"});
  } else {
    return NextResponse.json({status: 500, message: "Product sync failed"}, {status: 500});
  }
  
}
async function syncProductFromSanity(payload: WebhookPayload, productId: string, syncId: number) {
    try {
        // 1. Pre-process all data OUTSIDE the transaction
        const productImages = [
            ...(payload.mainImage ? [payload.mainImage.asset._ref] : []), 
            ...payload.imageGallery.map((image) => image.asset._ref)
        ];

        // 2. Get existing variants OUTSIDE the transaction
        const existingVariants = await prisma.variant.findMany({
            where: { productId: productId }
        });

        const existingVariantMap: Record<string, DatabaseVariantType> = {};
        existingVariants.forEach((variant) => {
            if (variant.id) {
                existingVariantMap[variant.id] = variant;
            }
        });

        // 3. Pre-process variant operations
        const processedVariantIds = new Set<string>();
        const variantOperations: Array<{
            type: 'upsert';
            data: any;
        }> = [];

        if (payload.variants && Array.isArray(payload.variants)) {
            for (const variant of payload.variants) {
                const variantId = variant._key;
                processedVariantIds.add(variantId);
                
                variantOperations.push({
                    type: 'upsert',
                    data: {
                        where: {
                            productId_size_color: {
                                productId: productId,
                                size: variant.size,
                                color: variant.color,
                            }
                        },
                        update: {
                            id: variantId,
                            size: variant.size,
                            color: variant.color,
                            stockQuantity: variant.quantity == null ? 0 : variant.quantity,
                            sanityRevisionId: payload._rev,
                            lastSyncedAt: new Date(),
                            isActive: true,
                        },
                        create: {
                            id: variantId,
                            product: {
                                connect: { id: productId }
                            },
                            size: variant.size,
                            color: variant.color,
                            stockQuantity: variant.quantity == null ? 0 : variant.quantity,
                            sanityRevisionId: payload._rev,
                            lastSyncedAt: new Date(),
                            isActive: true,
                        }
                    }
                });
            }
        }

        // 4. Identify variants to deactivate
        const variantsToDeactivate = Object.keys(existingVariantMap).filter(
            variantId => !processedVariantIds.has(variantId)
        );

        // 5. Execute all operations in a SHORTER transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update/create product
            const product = await tx.product.upsert({
                where: { id: productId },
                update: {
                    title: payload.title,
                    description: payload.description,
                    slug: payload.slug.current,
                    price: payload.cost ? Math.round(payload.cost * 100) : null,
                    images: productImages,
                    sanityRevisionId: payload._rev,
                    lastSyncedAt: new Date(),
                    isActive: true,
                },
                create: {
                    id: productId,
                    title: payload.title,
                    description: payload.description,
                    slug: payload.slug.current,
                    price: payload.cost ? Math.round(payload.cost * 100) : null,
                    images: productImages,
                    categories: payload.categories || [],
                    sanityRevisionId: payload._rev,
                    lastSyncedAt: new Date(),
                    isActive: true,
                }
            });

            // Execute all variant upserts
            for (const operation of variantOperations) {
                await tx.variant.upsert(operation.data);
            }

            // Deactivate removed variants
            if (variantsToDeactivate.length > 0) {
                await tx.variant.updateMany({
                    where: { id: { in: variantsToDeactivate } },
                    data: { isActive: false }
                });
            }

            // Mark sync as successful
            await tx.sanitySync.update({
                where: { id: syncId },
                data: {
                    status: 'success',
                    processedAt: new Date()
                }
            });

            return product;
        }, { timeout: 5000 }); // Still increase timeout but less aggressive

        return parseServerActionResponse({
            result,
            status: "SUCCESS",
            error: ""
        });
        
    } catch (error) {
        console.error("Error syncing product from Sanity", error);
        
        // Mark sync as failed (outside transaction)
        await prisma.sanitySync.update({
            where: { id: syncId },
            data: {
                status: "failed",
                errorMessage: JSON.stringify(error) || "Unknown error",
                processedAt: new Date(),
            }
        });
        
        return {
            status: "ERROR",
            error: "Failed to sync product from Sanity",
            syncId: syncId,
        };
    }
}