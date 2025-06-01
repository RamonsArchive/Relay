import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WebhookPayload, DatabaseVariantType } from "@/globalTypes";
import { parseServerActionResponse } from "@/lib/utils";
import {isValidSignature} from '@sanity/webhook'

export async function POST(request: NextRequest) {

  console.log("🔍 Incoming headers:", 
    Object.fromEntries(request.headers.entries())
  );
  const secret = process.env.SANITY_WEBHOOK_SECRET as string;
  const signature = request.headers.get("sanity-webhook-signature") || "";
  const body = await request.text(); // read boyd into a string.
  console.log("RECIEVED BODY", body);
  console.log("REVICED SECRETE", secret);

  // validate the signature
  if (!(isValidSignature(body, signature, secret))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  
  const payload = JSON.parse(body);
  console.log("RECEVICED payload from webhook", payload);

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
  console.log("RESULT", result);
  if (result.status) {
    return NextResponse.json({status: 200, message: "Product synced successfully"});
  } else {
    return NextResponse.json({status: 500, message: "Product sync failed"}, {status: 500});
  }
  
}

async function syncProductFromSanity(payload: WebhookPayload, productId: string, syncId: number) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const productImages = [...(payload.mainImage ? [payload.mainImage.asset._ref] : []), ...payload.imageGallery.map((image) => image.asset._ref)];
            const product = await tx.product.upsert({
                where: { id: productId},
                update: {
                    title: payload.title,
                    description: payload.description,
                    slug: payload.slug.current,
                    price: payload.cost ? Math.round(payload.cost * 100) : null, // convert to cents if needed
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
                    price: payload.cost ? Math.round(payload.cost * 100) : null, // convert to cents if needed
                    images: productImages,
                    categories: payload.categories || [],
                    sanityRevisionId: payload._rev,
                    lastSyncedAt: new Date(),
                    isActive: true,
                    
                }
            })

            // 2. get existing variants to keep track of what needs to be updated or deactivated
            console.log("THIS IS THEPRODUCT ID", product.id);
            const existingVariants = await tx.variant.findMany({
                where: {productId: product.id}
            })

            const existingVariantMap: Record<string, DatabaseVariantType> = {}
            existingVariants.forEach((variant) => {
                // add the unique variant id to the map
                if (variant.id) {
                    existingVariantMap[variant.id] = variant;
                }
            })

            const processedVariantIds = new Set();

            // 3. proccess each variant 
            if (payload.variants && Array.isArray(payload.variants)) {
                for (const variant of payload.variants) {
                    // create stable id by combining product id and variant key
                    const variantId = `${product.id}-${variant._key}`;
                    processedVariantIds.add(variantId);
                    await tx.variant.upsert({
                        where: {id: variantId},
                        update: {
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
                                connect: {
                                    id: productId
                                }
                            },
                            size: variant.size,
                            color: variant.color,
                            stockQuantity: variant.quantity == null ? 0 : variant.quantity,
                            sanityRevisionId: payload._rev,
                            lastSyncedAt: new Date(),
                            isActive: true,
                        }
                    })
                    
                }
            }

             // 4. Soft-delete variants that weren't in this update
            for (const variantId in existingVariantMap) {
                if (!processedVariantIds.has(variantId)) {
                  await tx.variant.update({
                    where: { id: variantId },
                    data: { isActive: false }
                  })
                }
              }
              
              // 5. Mark sync as successful
              await tx.sanitySync.update({
                where: { id: syncId },
                data: {
                  status: 'success',
                  processedAt: new Date()
                }
              })
 
        }, {timeout: 2000})
        return parseServerActionResponse({
            result,
            status: "SUCCESS",
            error: ""
        });
        
    } catch (error) {
        console.error("Error syncing product from Sanity", error);
        // mark sync as failed
        await prisma.sanitySync.update({
            where: {id: syncId},
            data: {
                status: "failed",
                errorMessage: JSON.stringify(error) || "Unknown error",
                processedAt: new Date(),
            }
        })
        return {
            status: "ERROR",
            error: "Failed to sync product from Sanity",
            syncId: syncId,
        }
    }
}