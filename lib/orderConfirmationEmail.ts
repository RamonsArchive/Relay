// lib/email.ts
import { Resend } from 'resend';
import { ShippingAddressType } from '@/globalTypes';

const resend = new Resend(process.env.RESEND_API_KEY);
if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
}

interface OrderConfirmationEmailProps {
  email: string;
  customerName: string;
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
}

export async function sendOrderConfirmationEmail(props: OrderConfirmationEmailProps) {
  const {
    email,
    customerName,
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
  } = props;

  // Format currency helper
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };


  try {
    const { data, error } = await resend.emails.send({
      from: 'Your Store <onboarding@resend.dev>', // Replace with your domain
      to: [email],
      subject: `Order Confirmation #${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
            .order-details { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e9ecef; }
            .items-table th { background: #f8f9fa; font-weight: bold; }
            .totals { background: #f8f9fa; padding: 15px; border-radius: 8px; }
            .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
            .total-final { font-weight: bold; font-size: 1.1em; border-top: 2px solid #333; padding-top: 10px; }
            .shipping-info { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .button { display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 10px 0; }
            .footer { text-align: center; color: #6c757d; font-size: 0.9em; margin-top: 30px; }
            .product-image { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
            @media (max-width: 600px) {
              .container { padding: 10px; }
              .items-table { font-size: 0.9em; }
              .total-row { font-size: 0.9em; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1 style="margin: 0; color: #333;">Order Confirmed! 🎉</h1>
              <p style="margin: 10px 0 0 0;">Thank you for your order, ${customerName}!</p>
            </div>

            <!-- Order Details -->
            <div class="order-details">
              <h2>Order #${orderNumber}</h2>
              <p><strong>Order Date:</strong> ${orderDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
            </div>

            <!-- Order Items -->
            <div class="order-details">
              <h3>Order Items</h3>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Details</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr>
                      <td>
                        ${item.images?.[0] ? `<img src="${getImageUrl(item.images[0])}" alt="${item.productTitle}" class="product-image">` : ''}
                      </td>
                      <td>
                        <strong>${item.productTitle}</strong><br>
                        Size: ${item.variantSize}<br>
                        Color: ${item.variantColor}
                      </td>
                      <td>${item.quantity}</td>
                      <td>${formatCurrency(item.totalPrice)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Order Totals -->
            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
              </div>
              ${promoCode ? `
                <div class="total-row" style="color: #28a745;">
                  <span>Promo Code (${promoCode}):</span>
                  <span>-${formatCurrency(promoDiscount || 0)}</span>
                </div>
              ` : ''}
              <div class="total-row">
                <span>Shipping (${shippingMethod}):</span>
                <span>${shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
              </div>
              <div class="total-row">
                <span>Tax:</span>
                <span>${formatCurrency(taxAmount)}</span>
              </div>
              <div class="total-row total-final">
                <span>Total:</span>
                <span>${formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <!-- Shipping Information -->
            <div class="shipping-info">
              <h3>Shipping Address</h3>
              <p>
                ${shippingAddress.firstName || customerName}<br>
                ${shippingAddress.line1}<br>
                ${shippingAddress.line2 ? `${shippingAddress.line2}<br>` : ''}
                ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}<br>
                ${shippingAddress.country}
              </p>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${orderTrackingUrl}" class="button">Track Your Order</a>
              <a href="${supportUrl}" class="button" style="background: #6c757d;">Contact Support</a>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p>Questions about your order? <a href="${supportUrl}">Contact our support team</a></p>
              <p>This email was sent to ${email}</p>
              <p>&copy; ${new Date().getFullYear()} Your Store Name. All rights reserved.</p>
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

    console.log('Order confirmation email sent successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Error in sendOrderConfirmationEmail:', error);
    throw error;
  }
}

const getImageUrl = (images: string | string[] | null | undefined): string | null => {
    if (!images) return null;
    
    // If it's a string, try to parse as JSON first
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
        return parsed || null;
      } catch {
        // If parsing fails, treat as direct URL
        return images;
      }
    }
    
    // If it's already an array
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    
    return null;
  };

// Usage in your webhook:
/*
await sendOrderConfirmationEmail({
  email: order.customerEmail,
  customerName: order.customerName,
  orderNumber: order.id,
  orderDate: order.createdAt,
  subtotal: order.subtotal,
  taxAmount: order.taxAmount,
  shippingAmount: order.shippingAmount,
  discountAmount: order.discountAmount,
  totalAmount: order.amountTotal,
  currency: order.currency,
  shippingAddress: order.shippingAddress,
  shippingMethod: order.shippingMethod,
  estimatedDelivery: "5-7 business days",
  items: order.items.map(item => ({
    productTitle: item.productTitle,
    variantSize: item.variantSize,
    variantColor: item.variantColor,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
    images: item.images,
  })),
  promoCode: order.promoCodeUsed,
  promoDiscount: order.promoDiscount,
  orderTrackingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}`,
  supportUrl: `${process.env.NEXT_PUBLIC_APP_URL}/support`,
  paymentIntentId: order.paymentIntentId,
});
*/