// app/api/webhook/stripe/route.ts
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { parseServerActionResponse, sanitizeSanityId } from "@/lib/utils";
import { sendOrderConfirmationEmail } from "@/lib/orderConfirmationEmail";
import { NextResponse } from "next/server";
import {  OrderItemEmailType, ShippingSessionType, StripeSessionType } from "@/globalTypes";
import { writeClient } from "@/sanity/lib/write-client";


export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  console.log("🔑 Webhook received:", body);
  console.log("🔑 Webhook signature:", signature);
  console.log("🔑 Webhook secret:", process.env.STRIPE_WEBHOOK_SECRET);

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

  console.log('✅ Webhook verified:', event.type);

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
  console.log("Processing checkout complete", session);

  // Get user ID from session metadata (you'll need to set this during checkout)
  const userId = session.metadata?.userId;
  if (!userId) {
    return NextResponse.json({ status: "ERROR", error: "No user ID in session metadata" }, { status: 500 })
  }

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

  const selectedShippingRate = session.shipping_cost.shipping_rate;
    const selectedOption = session.shipping_options.find((option: ShippingSessionType) => 
    option.shipping_rate === selectedShippingRate
    );

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: userIdSanitized || "",
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      addressId: shippingAddress.id,
      status: 'PAID',
      amountTotal: (session.amount_total || 0) / 100,
      currency: session.currency,
      shippingMethod: selectedOption,
      shippingCost: (session.shipping_details?.shipping_option_data?.amount_total || 0) / 100,
      paymentIntentId: session.payment_intent || "",
      subtotal: subtotal / 100, // Convert to dollars
      promoCodeUsed: session.metadata?.appliedPromoCode || "",
      promoDiscount: (session.metadata?.promoDiscountAmount || 0),
      discountAmount: (session.metadata?.promoDiscountAmount || 0),
      taxAmount: (session.total_details?.amount_tax || 0) / 100,
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
            unitPrice: (item?.price?.unit_amount || 0) / 100,
            totalPrice: (item?.price?.unit_amount || 0) / 100 * (item.quantity || 1),
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
  await prisma.cart.delete({
    where: {
      stripeCheckoutSessionId: session.id,
    }
  });

  // Update inventory (your existing function)
  try {
    await updateSanityInventory(lineItems);
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
       



