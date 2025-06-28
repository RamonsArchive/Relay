// lib/email.ts
import { Resend } from 'resend';
import { ShippingAddressType } from '@/globalTypes';
import { urlFor } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);
if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
}

interface OrderConfirmationEmailProps {
  email: string;
  firstName: string;
  lastName: string;
  orderNumber: number;
  orderDate: Date;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  shippingAddress: ShippingAddressType;
  shippingMethod: string;
  estimatedDelivery: string;
  items: Array<{
    productTitle: string;
    variantSize: string;
    variantColor: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    images: any;
  }>;
  promoCode?: string;
  promoDiscount?: number;
  orderTrackingUrl: string;
  supportUrl: string;
  paymentIntentId: string;
  // Enhanced tracking information from EasyPost
  trackingCode?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  labelUrl?: string;
  deliveryDate?: string;
  deliveryDays?: number;
  carrier?: string;
  methodShipped?: string;
  shipmentCost?: number;
}

export async function sendOrderConfirmationEmail(props: OrderConfirmationEmailProps) {
  const {
    email,
    firstName,
    lastName,
    orderNumber,
    orderDate,
    subtotal,
    taxAmount,
    totalAmount,
    currency,
    shippingCost,
    shippingAddress,
    shippingMethod,
    estimatedDelivery,
    items,
    promoCode,
    promoDiscount,
    orderTrackingUrl,
    supportUrl,
    trackingCode,
    trackingNumber,
    trackingUrl,
    deliveryDate,
    deliveryDays,
    carrier,
    methodShipped,
    shipmentCost,
  } = props;

  // Format currency helper
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };

  // Format date helper
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  try {
    const { data, error } = await resend.emails.send({
      from: 'Relay <onboarding@resend.dev>', // Replace with your domain
      to: [email],
      subject: `Order Confirmation #${orderNumber} - ${trackingCode ? 'Shipping Label Created' : 'Processing'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 20px; color: white; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin: 10px 0; }
            .status-processing { background: #ffeaa7; color: #2d3436; }
            .status-shipped { background: #00b894; color: white; }
            .order-details { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .tracking-section { background: #e8f5e8; border: 2px solid #00b894; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .tracking-info { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
            .tracking-details { flex: 1; }
            .tracking-button { background: #00b894; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; margin-left: 15px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e9ecef; }
            .items-table th { background: #f8f9fa; font-weight: bold; }
            .product-row { vertical-align: top; }
            .product-info { display: flex; align-items: center; gap: 12px; }
            .product-image { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid #e9ecef; }
            .product-details h4 { margin: 0 0 5px 0; font-size: 14px; font-weight: bold; }
            .product-specs { font-size: 12px; color: #6c757d; margin: 0; }
            .totals { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .total-row { display: flex; justify-content: space-between; margin: 8px 0; align-items: center; }
            .total-label { font-size: 14px; }
            .total-amount { font-size: 14px; font-weight: 500; }
            .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 15px; margin-top: 15px; }
            .promo-row { color: #28a745; font-weight: 500; }
            .shipping-info { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .address-block { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 10px; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .button { display: inline-block; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 10px 5px; font-weight: bold; transition: background-color 0.3s; }
            .button-primary { background: #007bff; color: white; }
            .button-secondary { background: #6c757d; color: white; }
            .button:hover { opacity: 0.9; }
            .footer { text-align: center; color: #6c757d; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; }
            .footer a { color: #007bff; text-decoration: none; }
            .delivery-info { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 15px 0; border-radius: 0 4px 4px 0; }
            .highlight-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 0 4px 4px 0; }
            
            @media (max-width: 600px) {
              .container { padding: 10px; margin: 0; }
              .header { padding: 20px; }
              .header h1 { font-size: 24px; }
              .items-table { font-size: 12px; }
              .product-info { flex-direction: column; align-items: flex-start; }
              .product-image { width: 50px; height: 50px; }
              .tracking-info { flex-direction: column; align-items: stretch; }
              .tracking-button { margin: 15px 0 0 0; text-align: center; }
              .total-row { font-size: 13px; }
              .action-buttons .button { display: block; margin: 10px 0; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>Order Confirmed! 🎉</h1>
              <p>Thank you for your order, ${firstName} ${lastName}!</p>
              <div class="status-badge ${trackingCode ? 'status-shipped' : 'status-processing'}">
                ${trackingCode ? '📦 Shipping Label Created' : '⏳ Processing Order'}
              </div>
            </div>

            <!-- Order Summary -->
            <div class="order-details">
              <h2 style="margin-top: 0; color: #333;">Order #${orderNumber}</h2>
              <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                <div>
                  <p><strong>Order Date:</strong> ${formatDate(orderDate)}</p>
                  <p><strong>Payment Method:</strong> Card ending in ****</p>
                </div>
                <div>
                  <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
                  ${deliveryDate ? `<p><strong>Expected Delivery:</strong> ${formatDate(deliveryDate)}</p>` : ''}
                </div>
              </div>
            </div>

            ${trackingCode ? `
            <!-- Tracking Information -->
            <div class="tracking-section">
              <h3 style="margin-top: 0; color: #00b894;">📦 Shipping Information</h3>
              <div class="tracking-info">
                <div class="tracking-details">
                  <p style="margin: 5px 0;"><strong>Tracking Number:</strong> ${trackingNumber || trackingCode}</p>
                  <p style="margin: 5px 0;"><strong>Carrier:</strong> ${carrier || 'Standard Shipping'}</p>
                  <p style="margin: 5px 0;"><strong>Service:</strong> ${methodShipped || shippingMethod}</p>
                  ${deliveryDays ? `<p style="margin: 5px 0;"><strong>Delivery Time:</strong> ${deliveryDays} business days</p>` : ''}
                </div>
                ${trackingUrl ? `<a href="${trackingUrl}" class="tracking-button">Track Package</a>` : ''}
              </div>
              ${trackingUrl ? `
              <div class="highlight-box" style="margin-top: 15px;">
                <p style="margin: 0;"><strong>📱 Pro Tip:</strong> Bookmark your tracking link for easy access to real-time updates!</p>
              </div>
              ` : ''}
            </div>
            ` : `
            <!-- Processing Information -->
            <div class="delivery-info">
              <h4 style="margin-top: 0;">⏳ Your order is being processed</h4>
              <p style="margin-bottom: 0;">We're preparing your items for shipment. You'll receive another email with tracking information once your order ships.</p>
            </div>
            `}

            <!-- Order Items -->
            <div class="order-details">
              <h3 style="margin-top: 0;">📦 Order Items</h3>
              <table class="items-table">
                <thead>
                  <tr>
                    <th style="width: 60%;">Product</th>
                    <th style="width: 15%;">Qty</th>
                    <th style="width: 25%;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr class="product-row">
                      <td>
                        <div class="product-info">
                          ${item.images ? `<img src="${getImageUrl(item.images)}" alt="${item.productTitle}" class="product-image">` : '<div class="product-image" style="background: #e9ecef; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6c757d;">No Image</div>'}
                          <div class="product-details">
                            <h4>${item.productTitle}</h4>
                            <p class="product-specs">
                              Size: ${item.variantSize} • Color: ${item.variantColor}<br>
                              ${formatCurrency(item.unitPrice)} each
                            </p>
                          </div>
                        </div>
                      </td>
                      <td><strong>${item.quantity}</strong></td>
                      <td><strong>${formatCurrency(item.totalPrice)}</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Order Totals -->
            <div class="totals">
              <h3 style="margin-top: 0;">💰 Order Summary</h3>
              <div class="total-row">
                <span class="total-label">Subtotal (${items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span class="total-amount">${formatCurrency(subtotal)}</span>
              </div>
              ${promoCode ? `
                <div class="total-row promo-row">
                  <span class="total-label">Discount (${promoCode}):</span>
                  <span class="total-amount">-${formatCurrency(promoDiscount || 0)}</span>
                </div>
              ` : ''}
              <div class="total-row">
                <span class="total-label">Shipping (${methodShipped || shippingMethod}):</span>
                <span class="total-amount">${shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
              </div>
              ${shipmentCost && shipmentCost !== shippingCost ? `
                <div class="total-row" style="font-size: 12px; color: #6c757d;">
                  <span class="total-label">Actual Shipping Cost:</span>
                  <span class="total-amount">${formatCurrency(Math.round(parseFloat(shipmentCost.toString())))}</span>
                </div>
              ` : ''}
              <div class="total-row">
                <span class="total-label">Tax:</span>
                <span class="total-amount">${formatCurrency(taxAmount)}</span>
              </div>
              <div class="total-row total-final">
                <span class="total-label">Total Paid:</span>
                <span class="total-amount">${formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="shipping-info">
              <h3 style="margin-top: 0;">🚚 Shipping Address</h3>
              <div class="address-block">
                <strong>${shippingAddress.firstName} ${shippingAddress.lastName || ''}</strong><br>
                ${shippingAddress.line1}<br>
                ${shippingAddress.line2 ? `${shippingAddress.line2}<br>` : ''}
                ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}<br>
                ${shippingAddress.country}
                ${shippingAddress.phone ? `<br><strong>Phone:</strong> ${shippingAddress.phone}` : ''}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              ${trackingUrl ? `<a href="${trackingUrl}" class="button button-primary">Track Your Package</a>` : ''}
              <a href="${orderTrackingUrl}" class="button button-primary">View Order Details</a>
              <a href="${supportUrl}" class="button button-secondary">Contact Support</a>
            </div>

            <!-- Additional Information -->
            <div class="delivery-info">
              <h4 style="margin-top: 0;">📋 What's Next?</h4>
              <ul style="margin: 0; padding-left: 20px;">
                ${trackingCode ? `
                  <li>Your package is prepared and ready for pickup by ${carrier}</li>
                  <li>Track your shipment using the tracking number above</li>
                  <li>You'll receive updates via email as your package moves</li>
                ` : `
                  <li>We're preparing your order for shipment</li>
                  <li>You'll receive tracking information once shipped</li>
                  <li>Estimated processing time: 1-2 business days</li>
                `}
                <li>Contact support if you need to make any changes</li>
              </ul>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p><strong>Questions about your order?</strong> <a href="${supportUrl}">Contact our support team</a></p>
              <p>This email was sent to ${email}</p>
              <p style="margin-top: 20px;">
                &copy; ${new Date().getFullYear()} Relay. All rights reserved.<br>
                <small>Order #${orderNumber} • ${trackingCode ? `Tracking: ${trackingCode}` : 'Processing'}</small>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending order confirmation email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };

  } catch (error) {
    console.error('Error in sendOrderConfirmationEmail:', error);
    throw error;
  }
}

const getImageUrl = (images: string | string[] | null | undefined): string | null => {
    if (!images) return null;
    // If it's a string, try to parse as JSON first
    try {
      if (Array.isArray(images)) {
        const parseImage = JSON.parse(images[0]);
        return urlFor(parseImage).url();
      }
      const imageRef = JSON.parse(images);
      return urlFor(imageRef).url();
    } catch (error) {
      console.error("Error parsing images", error);
      return null;
    }
};

// Updated usage example with EasyPost data:
/*
await sendOrderConfirmationEmail({
  email: order.orderEmail,
  customerName: order.orderName,
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
  trackingCode: updateOrder.trackingCode,
  trackingNumber: updateOrder.trackingNumber,
  trackingUrl: updateOrder.trackingUrl,
  labelUrl: updateOrder.labelUrl,
  deliveryDate: updateOrder.deliveryDate,
  deliveryDays: updateOrder.deliveryDays,
  carrier: updateOrder.carrier,
  methodShipped: updateOrder.methodShipped,
  shipmentCost: updateOrder.shipmentCost,
});
*/