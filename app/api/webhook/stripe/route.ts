// app/api/webhook/stripe/route.ts
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { parseServerActionResponse, sanitizeSanityId, stripeToShippingMethod } from "@/lib/utils";
import { sendOrderConfirmationEmail } from "@/lib/orderConfirmationEmail";
import { NextResponse } from "next/server";
import {  OrderItemEmailType, ShippingSessionType, StripeSessionType } from "@/globalTypes";
import { writeClient } from "@/sanity/lib/write-client";
import { verifyCart } from "@/sanity/lib/actions";
import { sendRefundEmail } from "@/lib/orderRefund";


export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
 // console.log("🔑 Webhook received:", body);
  //console.log("🔑 Webhook signature:", signature);
  //console.log("🔑 Webhook secret:", process.env.STRIPE_WEBHOOK_SECRET);

  if (!signature) {
    return new Response('No signature provided', { status: 400 });
  }

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err);
    return new Response('Webhook signature verification failed', { status: 400 });
  }

 // console.log('✅ Webhook verified:', event.type); 

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      await handleCheckoutComplete(session);
      console.log('✅ Checkout completed successfully');
    } catch (error) {
      console.error('❌ Error processing checkout:', error);
      return new Response('Error processing checkout', { status: 500 });
    }
  }

  return new Response('Success', { status: 200 });
}

// Modified version of your function for webhooks (no auth/rate limiting)
async function handleCheckoutComplete(session: any) {
  console.log("Processing session", session);

  // Get user ID from session metadata (you'll need to set this during checkout)
  const userId = session.metadata?.userId;
  if (!userId) {
    return NextResponse.json({ status: "ERROR", error: "No user ID in session metadata" }, { status: 500 })
  }

  const cartId = session.metadata?.cartId;
  if (!cartId) {
    return NextResponse.json({ status: "ERROR", error: "No cart ID in session metadata" }, { status: 500 })
  }

   // verify the cart is still valid
  const verify_cart = await verifyCart(userId, cartId);
  if (verify_cart.status === "ERROR") {
    console.error('Failed to verify cart:', verify_cart.error);
    await handleRefundAndNotify(session, 'CART_INVALID', verify_cart.error);
    return NextResponse.json({ status: "ERROR", error: "Failed to verify cart" }, { status: 500 })
  }
  console.log("Cart verified successfully");

  const userIdSanitized = sanitizeSanityId(userId);

  // Update customer ID if needed
  if (session.metadata.hasExistingCustomer === "false" && session.customer) {
    await prisma.user.update({
      where: { id: userIdSanitized || "" },
      data: { stripeCustomerId: session.customer },
    });
  }

  // Get line items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ['data.price.product']
  });

  const subtotal = lineItems.data.reduce((acc, item) => {
    return acc + (item?.price?.unit_amount || 0) * (item.quantity || 1);
  }, 0);


  // Create or find the shipping address
  let shippingAddress;
  
  const addressData = {
    userId: userIdSanitized || "",
    firstName: session?.customer_details?.name?.split(' ')[0] || "",
    lastName: session?.customer_details?.name?.split(' ').slice(1).join(' ') || "",
    line1: session?.customer_details?.address?.line1 || "",
    line2: session?.customer_details?.address?.line2 || "",
    city: session?.customer_details?.address?.city || "",
    state: session?.customer_details?.address?.state || "",
    postalCode: session?.customer_details?.address?.postal_code || "",
    country: session?.customer_details?.address?.country || "US",
    phone: session?.customer_details?.phone || "",
    type: "shipping"
  };

  // Check if this exact address already exists for the user
  const existingAddress = await prisma.address.findFirst({
    where: {
      userId: userIdSanitized || "",
      line1: session.customer_details?.address?.line1,
      city: session.customer_details?.address?.city,
      state: session.customer_details?.address?.state,
      postalCode: session.customer_details?.address?.postal_code,
      country: session.customer_details?.address?.country || "US"
    }
  });

  if (existingAddress) {
    shippingAddress = existingAddress;
  } else {
    // Create new address
    shippingAddress = await prisma.address.create({
      data: addressData
    });
  }

  const costToShip = session.shipping_cost.amount_total;
  const selectedShippingMethod = stripeToShippingMethod(costToShip);

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: userIdSanitized || "",
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      addressId: shippingAddress.id,
      status: 'PAID',
      amountTotal: (session.amount_total || 0),
      currency: session.currency,
      shippingMethod: selectedShippingMethod,
      shippingCost: costToShip || 0,
      paymentIntentId: session.payment_intent || "",
      subtotal: subtotal, // Convert to dollars
      promoCodeUsed: session.metadata?.appliedPromoCode || "",
      promoDiscount: (parseInt(session.metadata?.promoDiscountAmount) || 0),
      discountAmount: (parseInt(session.metadata?.promoDiscountAmount) || 0),
      taxAmount: (session.total_details?.amount_tax || 0),
      orderName: session.customer_details?.name || "",
      orderEmail: session.customer_details?.email || "",

      shippingAddress: parseServerActionResponse({
        firstName: session.customer_details?.name?.split(' ')[0] || "",
        line1: session.customer_details?.address?.line1 || "",
        line2: session.customer_details?.address?.line2 || "",
        city: session.customer_details?.address?.city || "",
        state: session.customer_details?.address?.state || "",
        postalCode: session.customer_details?.address?.postal_code || "",
        country: session.customer_details?.address?.country || "",
        phone: session.customer_details?.phone || "",
      }),

      items: {
        create: lineItems.data.map(item => {
          const product = item?.price?.product;
          const metadata = typeof product === 'object' && product && 'metadata' in product ? product.metadata : {};
          
          return {
            productId: metadata.productId,
            variant: { connect: { id: metadata.variantId } },
            quantity: item.quantity || 1,
            unitPrice: (item?.price?.unit_amount || 0),
            totalPrice: (item?.price?.unit_amount || 0) * (item.quantity || 1),
            productTitle: metadata.productTitle,
            images: parseServerActionResponse(metadata.images),
            variantSize: metadata.size,
            variantColor: metadata.color,
            variantSku: metadata.sku,
          };
        })
      }
    },
    include: {
      items: true
    }
  });

  // Delete cart
  console.log("Deleting cart with session id", session.id);
  await prisma.cart.delete({
    where: {
      stripeCheckoutSessionId: session.id,
    }
  });

  // Update inventory (your existing function)
  try {
    const updateMYSQLVariants = await updateMYSQLInventory(lineItems);
    if (updateMYSQLVariants.status === "ERROR") {
      console.error('Failed to update inventory:', updateMYSQLVariants.error);
      return NextResponse.json({ status: "ERROR", error: "Failed to update inventory" }, { status: 500 })
    }
  } catch (error) {
    console.error('Failed to update inventory:', error);
    return NextResponse.json({ status: "ERROR", error: "Failed to update inventory" }, { status: 500 })
  }
  try {
    const updateSanity = await updateSanityInventory(lineItems);
    if (updateSanity.status === "ERROR") {
      console.error('Failed to update inventory:', updateSanity.error);
      return NextResponse.json({ status: "ERROR", error: "Failed to update inventory" }, { status: 500 })
    }
  } catch (inventoryError) {
    console.error('Failed to update inventory:', inventoryError);
    return NextResponse.json({ status: "ERROR", error: "Failed to update inventory" }, { status: 500 })
  }

  // Send confirmation email
  try {
    await sendOrderConfirmationEmail({
      email: order.orderEmail,
      customerName: order.orderName,
      orderNumber: order.id,
      orderDate: order.createdAt,
      subtotal: order.subtotal,
      taxAmount: order.taxAmount,
      discountAmount: order.discountAmount,
      totalAmount: order.amountTotal,
      currency: order.currency,
      shippingAddress: order.shippingAddress,
      shippingMethod: order.shippingMethod,
      shippingCost: order.shippingCost,
      estimatedDelivery: "5-7 business days",
      items: order.items.map((item: OrderItemEmailType) => ({
        productTitle: item.productTitle,
        variantSize: item.variantSize,
        variantColor: item.variantColor,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        images: item.images,
      })),
      promoCode: session.discounts?.[0]?.coupon?.name || undefined,
      promoDiscount: order.discountAmount,
      orderTrackingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}`,
      supportUrl: `${process.env.NEXT_PUBLIC_APP_URL}/support`,
      paymentIntentId: order.paymentIntentId,
    });

  } catch (error) {
    console.error("Failed to send order confirmation email", error);
    return NextResponse.json({ status: "ERROR", error: "Failed to send order confirmation email" }, { status: 500 })
  }
}

   const updateMYSQLInventory = async (lineItems: any) => {
    try {
        console.log("Updating MYSQL inventory");
        const result = await prisma.$transaction(async (tx) => {
            const updates = [];
            
            for (const item of lineItems.data) {
              const variantId = item.price.product.metadata.variantId;
              const purchasedQuantity = item.quantity;
              
              const variantUpdate = await tx.variant.update({
                where: { id: variantId },
                data: {
                  stockQuantity: { decrement: purchasedQuantity }
                }
              });
              
              updates.push(variantUpdate);
            }
            
            return updates;
          });
          if (!result || result.length === 0) {
            return parseServerActionResponse({
                status: "ERROR",
                error: "Failed to update inventory"
            })
          }
          return parseServerActionResponse({    
            status: "SUCCESS",
            message: "Inventory updated successfully"
          })
    } catch (error) {
        console.error('Failed to update inventory:', error);
        return parseServerActionResponse({
            status: "ERROR",
            error: "Failed to update inventory"
        })
    }
   }
// Updated refund handler with proper error handling
export const handleRefundAndNotify = async (session: any, errorType: string, errorMessage: string) => {
    try {
      console.log(`🔄 Processing refund for session: ${session.id}`);
      console.log(`📝 Reason: ${errorType} - ${errorMessage}`);
      
      // 1. Process the refund
      const refund = await stripe.refunds.create({
        payment_intent: session.payment_intent,
        reason: 'requested_by_customer', // Use standard Stripe reasons
        metadata: {
          original_session_id: session.id,
          refund_reason: errorType,
          error_details: errorMessage,
          processed_by: 'webhook_auto_refund'
        }
      });
  
      // Check refund status
      if (refund.status === "failed") {
        console.error('❌ Refund failed:', refund.failure_reason);
        throw new Error(`Refund failed: ${refund.failure_reason}`);
      }
  
      console.log(`✅ Refund created: ${refund.id} (Status: ${refund.status})`);
  
      // 2. Send customer notification
      const refundEmail = await sendRefundEmail(session, refund, errorType);
      
      if (refundEmail.status === "ERROR") {
        console.error('❌ Failed to send refund email:', refundEmail.error);
        // Don't fail the entire process if email fails
      } else {
        console.log('✅ Refund email sent successfully');
      }
  
      return {
        success: true,
        refundId: refund.id,
        refundStatus: refund.status,
        emailSent: refundEmail.status === "SUCCESS"
      };
  
    } catch (error) {
      console.error('❌ Failed to process refund:', error);
      throw error; // Re-throw to be handled by calling function
    }
  };
  

    
    const updateSanityInventory = async (lineItems: any) => {
        try {
          console.log("Updating sanity inventory");
          for (const item of lineItems.data) {
            const product = item?.price?.product;
            const metadata = typeof product === 'object' && product && 'metadata' in product 
              ? product.metadata : {};
            
            const productId = metadata.productId;
            const variantId = metadata.variantId;
            const purchasedQuantity = item.quantity || 0;

            console.log("Product ID", productId);
            console.log("Variant ID", variantId);
            console.log("Purchased quantity", purchasedQuantity);
            
            if (!productId || !variantId) {
                return parseServerActionResponse({
                    status: "ERROR",
                    error: "Failed to update inventory"
                })
            }
      
            // Fetch current product
            const currentProduct = await writeClient.fetch(
              `*[_type == "product" && _id == $productId][0]{
                _id,
                "variants": variants[]{
                  _key,
                  size,
                  color->{_id, name, value},
                  quantity
                }
              }`,
              { productId }
            );
      
            if (!currentProduct?.variants) {
                return parseServerActionResponse({
                    status: "ERROR",
                    error: "Failed to update inventory"
                })
            }
      
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

            console.log("Updated variants", updatedVariants);
      
            // Update the entire variants array
            await writeClient
              .patch(productId)
              .set({ variants: updatedVariants })
              .commit();
      
            console.log(`Updated product ${productId}: ${currentProduct.variants.length} -> ${updatedVariants.length} variants`);
            return parseServerActionResponse({
              status: "SUCCESS",
              message: "Inventory updated successfully"
            })

          }
        } catch (error) {
          console.error('Error in advanced inventory update:', error);
          return parseServerActionResponse({
            status: "ERROR",
            error: "Failed to update inventory"
          })
        }
      };
       



