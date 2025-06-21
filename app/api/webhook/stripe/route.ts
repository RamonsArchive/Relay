import {auth} from "@/auth";
import { rateLimiter } from "@/lib/rateLimiter";
import { stripe } from "@/lib/stripe";
import { parseServerActionResponse, sanitizeSanityId } from "@/lib/utils";
import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export const handleCheckoutComplete = async (session: any) => {
    console.log("Proccessing checkout complete", session)
    const sessionAuth = await auth();
    const sessionId = sessionAuth?.user?.id;
    const userIdSanitized = sanitizeSanityId(sessionId || "");

    if (!userIdSanitized) {
        return new Response("Unauthorized", { status: 401 })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:fetchOrderDetails`);
    if (!success) {
        return new NextResponse("Too many requests", { status: 429 })
    }

    if (session.metadata.hasExistingCustomer === "false" && session.customer) {
        await prisma.user.update({
            where: {
                id: userIdSanitized,
            },
            data: {
                stripeCustomerId: session.customer,
            }
        })
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product']
    })

    const subtotal = lineItems.data.reduce((acc, item) => {
        return acc + (item?.price?.unit_amount || 0) * (item.quantity || 1);
    }, 0);


    const order = await prisma.order.create({
        data: {
            userId: userIdSanitized,
            stripeSessionId: session.id,
            stripeCustomerId: session.customer,
            status: 'PAID',
            amountTotal: (session.amount_total || 0) / 100,
            currency: session.currency,
            shippingMethod: session.shipping_details.shipping_option_data.name,
            shippingCost: (session.shipping_details.shipping_option_data.amount_total) / 100,
            paymentIntentId: session.payment_intent,
            subtotal: subtotal,
            discountAmount: (session.discounts?.coupon?.percent_off || 0) * subtotal / 100,
            taxAmount: (session.tax_percent || 0) * subtotal / 100,
            shippingAmount: (session.shipping_details.shipping_option_data.amount_total) / 100,

            // make sure to parse the address to avoid null values and to make things sting for json values
            shippingAddress: parseServerActionResponse({
                firstName: String(session.shipping_details.name || ""),
                line1: String(session.shipping_details.address.line1 || ""),
                line2: String(session.shipping_details.address.line2 || ""),
                city: String(session.shipping_details.address.city || ""),
                state: String(session.shipping_details.address.state || ""),
                postalCode: String(session.shipping_details.address.postal_code || ""),
                country: String(session.shipping_details.address.country || ""),
                phone: String(session.shipping_details.phone || ""),
              }),

            orderName: session.customer_details?.name || "",
            orderEmail: session.customer_details?.email || "",

            items: {
                create: lineItems.data.map(item => {
                    const product = item?.price?.product;
                    const metadata = typeof product === 'object' && product && 'metadata' in product ? product.metadata : {};
                    
                    return {
                        productId: metadata.productId,
                        variant: { connect: { id: metadata.variantId } },
                        variantId: metadata.variantId,
                        quantity: item.quantity || 1,
                        unitPrice: (item?.price?.unit_amount || 0) / 100,
                        totalPrice: (item?.price?.unit_amount || 0) / 100 * (item.quantity || 0),
                        productTitle: metadata.productTitle,
                        images: parseServerActionResponse(metadata.images),
                        variantSize: metadata.size,
                        variantColor: metadata.color,
                        variantSku: metadata.sku,
                    } 
                })
            }
        
        } 
    })

    if (!order) {
        console.error("Failed to create order", session)
        return NextResponse.json({ status: "ERROR", error: "Failed to create order" }, { status: 500 })
    }

    const deleteCart = await prisma.cart.delete({
        where: {
            id: session.metadata.cartId,
        }
    })

    if (!deleteCart) {
        console.error("Failed to delete cart", session)
        return NextResponse.json({ status: "ERROR", error: "Failed to delete cart" }, { status: 500 })
    }

    // update sanity database product inventory
    try {
        await updateSanityInventory(lineItems);
      } catch (inventoryError) {
        console.error('Failed to update inventory, but order was created:', inventoryError);
        // Consider how to handle this - maybe queue for retry, send alert, etc.
        // Don't throw here unless you want to fail the entire checkout process
      }
} 

    
    export const updateSanityInventory = async (lineItems: any) => {
        try {
          for (const item of lineItems.data) {
            const product = item?.price?.product;
            const metadata = typeof product === 'object' && product && 'metadata' in product 
              ? product.metadata : {};
            
            const productId = metadata.productId;
            const variantId = metadata.variantId;
            const purchasedQuantity = item.quantity || 0;
            
            if (!productId || !variantId) continue;
      
            // Fetch current product
            const currentProduct = await writeClient.fetch(
              `*[_type == "products" && _id == $productId][0]{
                _id,
                variants[]{
                  _key,
                  size,
                  color->{_id, name, value},
                  quantity
                }
              }`,
              { productId }
            );
      
            if (!currentProduct?.variants) continue;
      
            // Process variants
            const updatedVariants = currentProduct.variants
              .map((variant: any) => {
                if (variant._key === variantId) {
                  const newQuantity = Math.max(0, variant.quantity - purchasedQuantity);
                  return newQuantity > 0 ? { ...variant, quantity: newQuantity } : null;
                }
                return variant;
              })
              .filter(Boolean); // Remove null variants (those with 0 quantity)
      
            // Update the entire variants array
            await writeClient
              .patch(productId)
              .set({ variants: updatedVariants })
              .commit();
      
            console.log(`Updated product ${productId}: ${currentProduct.variants.length} -> ${updatedVariants.length} variants`);
          }
        } catch (error) {
          console.error('Error in advanced inventory update:', error);
          throw error;
        }
      };
       



