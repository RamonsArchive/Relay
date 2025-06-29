// app/api/webhook/stripe/route.ts
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { fetchShippingOptions, parseServerActionResponse, sanitizeSanityId } from "@/lib/utils";
import { sendOrderConfirmationEmail } from "@/lib/orderConfirmationEmail";
import { NextResponse } from "next/server";
import {  EasyPostAddressType, OrderItemEmailType, RefundType, ShippingAddressType } from "@/globalTypes";
import { writeClient } from "@/sanity/lib/write-client";
import { verifyCartInternal } from "@/sanity/lib/actions";
import { sendRefundEmail } from "@/lib/orderRefund";
import easypost, { createWarehouseAddress } from "@/lib/easyPost";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const endPointSecret = process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET;

  if (!signature) {
    return new Response('No signature provided', { status: 400 });
  }

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      endPointSecret!
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err);
    return new Response('Webhook signature verification failed', { status: 400 });
  }


  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      await handleCheckoutComplete(session);
    } catch (error) {
      console.error('❌ Error processing checkout:', error);
      return new Response('Error processing checkout', { status: 500 });
    }
  }

  return new Response('Success', { status: 200 });
}

// Modified version of your function for webhooks (no auth/rate limiting)
async function handleCheckoutComplete(session: any) {
  // Get user ID from session metadata (you'll need to set this during checkout)
  const userId = session.metadata?.userId;
  if (!userId) {
    return NextResponse.json({ status: "ERROR", error: "No user ID in session metadata" }, { status: 500 })
  }

  const cartId = parseInt(session.metadata?.cartId || "0");
  if (!cartId) {
    return NextResponse.json({ status: "ERROR", error: "No cart ID in session metadata" }, { status: 500 })
  }

   // verify the cart is still valid
  const verify_cart = await verifyCartInternal(userId, cartId);
  if (verify_cart.status === "ERROR") {
    console.error('Failed to verify cart:', verify_cart.error);
    await handleRefundAndNotify(session, 'CART_INVALID', verify_cart.error);
    return NextResponse.json({ status: "ERROR", error: "Failed to verify cart" }, { status: 500 })
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
  const getShippingData = await fetchShippingOptions(costToShip);
  const selectedShippingMethod = getShippingData.data.display_name;
  const minimumDeliveryDays = getShippingData.data.delivery_estimate.minimum.value;
  const maximumDeliveryDays = getShippingData.data.delivery_estimate.maximum.value;

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
      firstName: session.customer_details?.name?.split(' ')[0] || "",
      lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || "",
      orderEmail: session.customer_details?.email || "",

      shippingAddress: parseServerActionResponse({
        firstName: session.customer_details?.name?.split(' ')[0] || "",
        lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || "",
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
  await prisma.cart.delete({
    where: {
      id: cartId,
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

  // Create shipment and update order
  try {
    const shipmentResult = await makeShipment(order);
    if (shipmentResult.status === "ERROR") {
      console.error("Failed to create shipment", shipmentResult.error);
      await handleRefundAndNotify(session, 'SHIPPING_LABEL_FAILED', shipmentResult.error);
      return NextResponse.json({ status: "ERROR", error: "Failed to create shipment" }, { status: 500 })
    }
    const rateResult = await getRate(shipmentResult.shipment, costToShip, minimumDeliveryDays, maximumDeliveryDays)
    if (rateResult.status === "ERROR") {
      console.error("Failed to get rate", rateResult.error);
      await handleRefundAndNotify(session, 'SHIPPING_LABEL_FAILED', rateResult.error);
      return NextResponse.json({ status: "ERROR", error: "Failed to get rate" }, { status: 500 })
    }
    const purchaseResult = await buyShipment(shipmentResult.shipment.id, rateResult.data.rate.id)
    if (purchaseResult.status === "ERROR") {
      console.error("Failed to buy shipment", purchaseResult.error);
      await handleRefundAndNotify(session, 'SHIPPING_LABEL_FAILED', purchaseResult.error);
      return NextResponse.json({ status: "ERROR", error: "Failed to buy shipment" }, { status: 500 })
    }
    console.log("purchaseResult in route", purchaseResult);
    try {
      const updateOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: purchaseResult.data.status,
          trackingCode: purchaseResult.data.trackingCode,
          trackingNumber: purchaseResult.data.trackingNumber,
          trackingUrl: purchaseResult.data.trackingUrl,
          labelUrl: purchaseResult.data.labelUrl,
          deliveryDate: purchaseResult.data.deliveryDate, 
          deliveryDays: purchaseResult.data.deliveryDays,
          methodShipped: purchaseResult.data.shippingMethod,
          carrier: purchaseResult.data.carrier,
          shipmentCost: purchaseResult.data.shipmentCost,
          estimatedDelivery: purchaseResult.data.estimatedDelivery,
        }
      })

      if (!updateOrder) {
        console.error("Failed to update order", updateOrder);
        await handleRefundAndNotify(session, 'SHIPPING_LABEL_FAILED', updateOrder);
        return NextResponse.json({ status: "ERROR", error: "Failed to update order" }, { status: 500 })
      } 

      try {
        const emailResult = await sendOrderConfirmationEmail({
          email: order.orderEmail,
          firstName: order.firstName,
          lastName: order.lastName,
          orderNumber: order.id,
          orderDate: order.createdAt,
          subtotal: order.subtotal,
          taxAmount: order.taxAmount,
          shippingCost: order.shippingCost,
          discountAmount: order.discountAmount,
          totalAmount: order.amountTotal,
          currency: order.currency,
          shippingAddress: order.shippingAddress as ShippingAddressType,
          shippingMethod: order.shippingMethod,
          estimatedDelivery: `${minimumDeliveryDays}-${maximumDeliveryDays} business days`,
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
          // EasyPost tracking data from updateOrder
          trackingCode: purchaseResult.data.trackingCode,
          trackingNumber: purchaseResult.data.trackingNumber,
          trackingUrl: purchaseResult.data.trackingUrl,
          labelUrl: purchaseResult.data.labelUrl,
          deliveryDate: purchaseResult.data.deliveryDate,
          deliveryDays: purchaseResult.data.deliveryDays,
          carrier: purchaseResult.data.carrier,
          methodShipped: purchaseResult.data.methodShipped,
          shipmentCost: purchaseResult.data.shipmentCost,
        });
        if (!emailResult) {
          console.error("Failed to send order confirmation email", emailResult);
          return NextResponse.json({ status: "ERROR", error: "Failed to send order confirmation email" }, { status: 500 })
        }
    
        return NextResponse.json({ status: "SUCCESS", message: "Order processed successfully" }, { status: 200 })
    
      } catch (error) {
        console.error("Failed to send order confirmation email", error);
        return NextResponse.json({ status: "ERROR", error: "Failed to send order confirmation email" }, { status: 500 })
      }

    } catch (error) {
      console.error("Failed to update order", error);
      await handleRefundAndNotify(session, 'SHIPPING_LABEL_FAILED', JSON.stringify(error));
      return NextResponse.json({ status: "ERROR", error: "Failed to update order" }, { status: 500 })
    }

  } catch (error) {
    console.error("Failed to send order confirmation email", error);
    await handleRefundAndNotify(session, 'SHIPPING_LABEL_FAILED', JSON.stringify(error));
    return NextResponse.json({ status: "ERROR", error: "Failed to send order confirmation email" }, { status: 500 })
  }

}

   const buyShipment = async (shipmentId: string, rateId: string) => {
    try {
      const isTestMode = process.env.EASYPOST_TEST_MODE === "true";
      if (isTestMode) {
        // Get the actual shipment and rate data to make mock more realistic
        const shipment = await easypost.Shipment.retrieve(shipmentId);
        const selectedRate = shipment.rates.find((rate: any) => rate.id === rateId);
        
        if (!selectedRate) {
          throw new Error("Rate not found");
        }
  
        // Generate realistic mock data based on actual rate
        const mockTrackingNumber = `TEST${Date.now().toString().slice(-8)}`;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + (selectedRate.delivery_days || 3));
  
        return parseServerActionResponse({
          status: "SUCCESS",
          data: {
            purchase: {
              id: shipmentId,
              tracking_code: mockTrackingNumber,
              status: "purchased",
              // ... other mock fields
            },
            status: "Label created successfully",
            trackingCode: mockTrackingNumber,
            trackingNumber: mockTrackingNumber,
            trackingUrl: `https://www.easypost.com/tracking/${mockTrackingNumber}`,
            labelUrl: `https://easypost-files.s3-us-west-2.amazonaws.com/files/postage_label/${mockTrackingNumber}.pdf`,
            deliveryDate: deliveryDate.toISOString(),
            deliveryDays: selectedRate.delivery_days || 3,
            shippingMethod: selectedRate.service,
            carrier: selectedRate.carrier,
            shipmentCost: Math.round(parseFloat(selectedRate.rate) * 100),
            estimatedDelivery: `${selectedRate.delivery_days || 3} business days`,
          }
        });
      }

      const purchase = await easypost.Shipment.buy(shipmentId, {
        rate: {id: rateId}
      })

      return parseServerActionResponse({
        status: "SUCCESS",
        data: {
          purchase: purchase,
          status: purchase.status_detail,
          trackingCode: purchase.tracking_code,
          trackingNumber: purchase.tracking_code,
          trackingUrl: purchase.public_url,
          labelUrl: purchase.postage_label.label_url,
          deliveryDate: purchase.delivery_date,
          deliveryDays: purchase.delivery_days,
          shippingMethod: purchase.service,
          carrier: purchase.carrier,
          shipmentCost: purchase.rate.rate,
          estimatedDelivery: `${purchase.delivery_days} business days`,
        }
      })
    } catch (error) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to buy shipment"
      })
    }
   }

   const getRate = async (shipment: any, costToShip: number, minimumDeliveryDays: number, maximumDeliveryDays: number) => {
  
    try {
      const carriersWithErrors = shipment.messages.filter((msg: any) => msg.type === "rate_error").map((msg: any) => msg.carrier);

      const availableCarriers = shipment.rates.filter((rate: any) => !carriersWithErrors.includes(rate.carrier));

      if (availableCarriers.length === 0) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "No available carriers"
        })
      }

        // costToShip is the cost of the shipping method
      let cheapestRate = null;
      let validRates = availableCarriers.filter((rate: any) => {
        const inRange = rate.delivery_days >= minimumDeliveryDays && 
                       rate.delivery_days <= maximumDeliveryDays;
        const withinBudget = rate.rate <= costToShip;
        return inRange && withinBudget;
      });
    
      if (!cheapestRate && validRates.length > 0) {
        cheapestRate = validRates.sort((a: any, b: any) => parseFloat(a.rate) - parseFloat(b.rate))[0];
      }
    
      // Step 2: Try rates within delivery window (ignore cost)
      validRates = availableCarriers.filter((rate: any) => {
        return rate.delivery_days >= minimumDeliveryDays && 
               rate.delivery_days <= maximumDeliveryDays;
      });
    
      if (!cheapestRate && validRates.length > 0) {
        cheapestRate = validRates.sort((a: any, b: any) => parseFloat(a.rate) - parseFloat(b.rate))[0];
      }
    
      // Step 3: Fallback to cheapest rate overall
      cheapestRate = availableCarriers.sort((a: any, b: any) => parseFloat(a.rate) - parseFloat(b.rate))[0];

      return parseServerActionResponse({
        status: "SUCCESS",
        data: {
          rate: cheapestRate,
          shipmentCost: parseFloat(cheapestRate.rate), // Already in dollars
          estimatedDelivery: `${cheapestRate.delivery_days} business days`,
          shippingMethod: cheapestRate.service,
          carrier: cheapestRate.carrier,
          deliveryDays: cheapestRate.delivery_days,
          deliveryDate: cheapestRate.delivery_date,
          // NO tracking info here - only available after purchase
        }
      })

    } catch (error) {
      console.error("Failed to get rate", error);
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to get rate"
      })
    }
   }

   const makeShipment = async (order: any) => {
    if (!order) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No order provided"
      })
    }

    const warehouseAddress = await createWarehouseAddress();

    const toAddress = {
        name: order.shippingAddress.firstName + " " + order.shippingAddress.lastName,
        street1: order.shippingAddress.line1,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        zip: order.shippingAddress.postalCode,
        country: order.shippingAddress.country,
        phone: order.shippingAddress.phone,
    }

    const verifyToAddress = await verifyAddress(toAddress);
    if (verifyToAddress.status === "ERROR") {
      console.error("Failed to verify to address", verifyToAddress.error);
      return parseServerActionResponse({
        status: "ERROR",
        error: verifyToAddress.error
      })
    }

    const shipment = await easypost.Shipment.create({
      mode: "test",
      to_address: { 
        ...toAddress,
        verify: ["delivery"],
      },
      from_address: warehouseAddress,
      return_address: warehouseAddress,
      parcel: {
        weight: 5.0,
        length: 10.0,
        width: 10.0,
        height: 10.0,
      },
    })

    if (shipment.status === "failed") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to create shipment"
      })
    }
      if (shipment.messages && shipment.messages.length > 0) {
        const criticalErrors = shipment.messages.filter((msg: any) =>
          msg.type === 'address_error' || msg.type === 'shipment_error'
        );
        
        if (criticalErrors.length > 0) {
          return parseServerActionResponse({
            status: "ERROR",
            error: `Critical shipment issues: ${criticalErrors.map((e: any) => e.message).join(', ')}`
          });
        }

      if (!shipment.rates || shipment.rates.length === 0) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "No shipping rates found for this destination"
        })
      }
    }

    if (shipment.to_address.verifications.delivery.success === false) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to verify to address"
      })
    }
    
    return parseServerActionResponse({  
      status: "SUCCESS",
      error: "",
      shipment: shipment
    })
   }

   const verifyAddress = async (address: EasyPostAddressType) => {
    try {
      const verifiedAddress = await easypost.Address.create({
        ...address,
        verify: true
      });

      if (verifiedAddress.verifications.delivery.success) {
        return { status: "SUCCESS", address: verifiedAddress };
      } else {
        return { 
          status: "ERROR", 
          error: verifiedAddress.verifications.delivery.errors 
        };
      }
    } catch (error) {
      return { status: "ERROR", error: (error as Error).message };
    }
  };

   

   const updateMYSQLInventory = async (lineItems: any) => {
    try {
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
const handleRefundAndNotify = async (session: any, errorType: string, errorMessage: string) => {
    try {
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
    
      // 2. Send customer notification
      const refundEmail = await sendRefundEmail(session, refund as unknown as RefundType, errorType);
      
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
          for (const item of lineItems.data) {
            const product = item?.price?.product;
            const metadata = typeof product === 'object' && product && 'metadata' in product 
              ? product.metadata : {};
            
            const productId = metadata.productId;
            const variantId = metadata.variantId;
            const purchasedQuantity = item.quantity || 0;
            
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
                  color,
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
                  return newQuantity > 0 ? { 
                    ...variant, 
                    quantity: newQuantity,
                    size: variant.size,
                    color: variant.color
                  } : null;
                }
                return variant;
              })
              .filter(Boolean); // Remove null variants (those with 0 quantity)
      
            // Update the entire variants array
            await writeClient
              .patch(productId)
              .set({ variants: updatedVariants })
              .commit();
      
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
       



