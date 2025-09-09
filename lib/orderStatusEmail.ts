// lib/email.ts - Add this function to your existing email file

import { Resend } from 'resend';
import { ShippingAddressType } from '@/globalTypes';
import { urlFor } from "@/sanity/lib/client";

interface OrderStatusEmailProps {
  email: string;
  customerName: string;
  orderNumber: number;
  orderDate: Date;
  status: string;
  estimatedDelivery?: string;
  trackingCode?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  methodShipped?: string;
  shippingAddress: ShippingAddressType;
  items: Array<{
    productTitle: string;
    variantSize: string;
    variantColor: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    images: any;
  }>;
  supportUrl: string;
  orderTrackingUrl: string;
}

export async function sendOrderStatusEmail(orderData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const props: OrderStatusEmailProps = {
    email: orderData.orderEmail,
    customerName: orderData.orderName,
    orderNumber: orderData.id,
    orderDate: orderData.createdAt,
    status: orderData.status,
    estimatedDelivery: orderData.estimatedDelivery,
    trackingCode: orderData.trackingCode,
    trackingNumber: orderData.trackingNumber,
    trackingUrl: orderData.trackingUrl,
    carrier: orderData.carrier,
    methodShipped: orderData.methodShipped,
    shippingAddress: orderData.shippingAddress as ShippingAddressType,
    items: orderData.items.map((item: any) => ({
      productTitle: item.productTitle,
      variantSize: item.variantSize,
      variantColor: item.variantColor,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      images: item.images,
    })),
    supportUrl: `${process.env.NEXT_PUBLIC_APP_URL}/support`,
    orderTrackingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderData.id}`,
  };

  // Get status-specific content
  const statusContent = getStatusContent(props.status);
  
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
      to: [props.email],
      subject: `${statusContent.subject} - Order #${props.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Status Update</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
            .header { padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 20px; color: white; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .status-badge { display: inline-block; padding: 10px 20px; border-radius: 25px; font-size: 16px; font-weight: bold; margin: 15px 0; }
            .order-details { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .tracking-section { border-radius: 8px; padding: 20px; margin: 20px 0; }
            .tracking-info { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
            .tracking-details { flex: 1; }
            .tracking-button { background: #007bff; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; margin-left: 15px; }
            .items-summary { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .item-row { display: flex; align-items: center; gap: 15px; margin: 10px 0; }
            .item-image { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #e9ecef; }
            .item-details { flex: 1; }
            .item-name { font-weight: bold; margin: 0 0 5px 0; }
            .item-specs { font-size: 12px; color: #6c757d; margin: 0; }
            .shipping-info { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .address-block { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 10px; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .button { display: inline-block; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 10px 5px; font-weight: bold; }
            .button-primary { background: #007bff; color: white; }
            .button-secondary { background: #6c757d; color: white; }
            .footer { text-align: center; color: #6c757d; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; }
            .footer a { color: #007bff; text-decoration: none; }
            .info-box { padding: 15px; margin: 15px 0; border-radius: 6px; }
            .info-box h4 { margin-top: 0; }
            
            /* Status-specific styles */
            .status-out-for-delivery .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
            .status-out-for-delivery .status-badge { background: #f093fb; color: white; }
            .status-out-for-delivery .tracking-section { background: #fdf2f8; border: 2px solid #f093fb; }
            .status-out-for-delivery .tracking-button { background: #f093fb; }
            .status-out-for-delivery .info-box { background: #fef7ff; border-left: 4px solid #f093fb; }
            
            .status-delivered .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
            .status-delivered .status-badge { background: #00f2fe; color: white; }
            .status-delivered .tracking-section { background: #f0fdff; border: 2px solid #00f2fe; }
            .status-delivered .tracking-button { background: #00f2fe; }
            .status-delivered .info-box { background: #f0fdff; border-left: 4px solid #00f2fe; }
            
            .status-exception .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
            .status-exception .status-badge { background: #fa709a; color: white; }
            .status-exception .tracking-section { background: #fff8e1; border: 2px solid #fa709a; }
            .status-exception .tracking-button { background: #fa709a; }
            .status-exception .info-box { background: #fff8e1; border-left: 4px solid #fa709a; }
            
            .status-failure .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); }
            .status-failure .status-badge { background: #ff6b6b; color: white; }
            .status-failure .tracking-section { background: #ffebee; border: 2px solid #ff6b6b; }
            .status-failure .tracking-button { background: #ff6b6b; }
            .status-failure .info-box { background: #ffebee; border-left: 4px solid #ff6b6b; }
            
            @media (max-width: 600px) {
              .container { padding: 10px; margin: 0; }
              .header { padding: 20px; }
              .header h1 { font-size: 24px; }
              .tracking-info { flex-direction: column; align-items: stretch; }
              .tracking-button { margin: 15px 0 0 0; text-align: center; }
              .item-row { flex-direction: column; align-items: flex-start; }
              .action-buttons .button { display: block; margin: 10px 0; }
            }
          </style>
        </head>
        <body>
          <div class="container status-${props.status?.replace('_', '-')}">
            <!-- Header -->
            <div class="header">
              <h1>${statusContent.icon} ${statusContent.title}</h1>
              <p>${statusContent.subtitle}</p>
              <div class="status-badge">
                ${statusContent.badgeText}
              </div>
            </div>

            <!-- Order Details -->
            <div class="order-details">
              <h2 style="margin-top: 0; color: #333;">Order #${props.orderNumber}</h2>
              <p><strong>Order Date:</strong> ${formatDate(props.orderDate)}</p>
              ${props.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${formatDate(props.estimatedDelivery)}</p>` : ''}
            </div>

            <!-- Tracking Information -->
            ${props.trackingUrl ? `
            <div class="tracking-section">
              <h3 style="margin-top: 0;">${statusContent.trackingTitle}</h3>
              <div class="tracking-info">
                <div class="tracking-details">
                  <p style="margin: 5px 0;"><strong>Tracking Number:</strong> ${props.trackingNumber || props.trackingCode}</p>
                  <p style="margin: 5px 0;"><strong>Carrier:</strong> ${props.carrier || 'Standard Shipping'}</p>
                  <p style="margin: 5px 0;"><strong>Service:</strong> ${props.methodShipped || 'Standard'}</p>
                </div>
                <a href="${props.trackingUrl}" class="tracking-button">Track Package</a>
              </div>
            </div>
            ` : ''}

            <!-- Status-specific Information -->
            <div class="info-box">
              <h4>${statusContent.infoTitle}</h4>
              <p>${statusContent.infoContent}</p>
              ${statusContent.additionalInfo ? `<p><strong>Additional Information:</strong> ${statusContent.additionalInfo}</p>` : ''}
            </div>

            <!-- Items Summary -->
            <div class="items-summary">
              <h3 style="margin-top: 0;">📦 Your Items</h3>
              ${props.items.slice(0, 3).map(item => `
                <div class="item-row">
                  ${item.images ? `<img src="${getImageUrl(item.images)}" alt="${item.productTitle}" class="item-image">` : '<div class="item-image" style="background: #e9ecef; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #6c757d;">No Image</div>'}
                  <div class="item-details">
                    <p class="item-name">${item.productTitle}</p>
                    <p class="item-specs">Size: ${item.variantSize} • Color: ${item.variantColor} • Qty: ${item.quantity}</p>
                  </div>
                </div>
              `).join('')}
              ${props.items.length > 3 ? `<p style="text-align: center; margin: 15px 0; color: #6c757d;">+ ${props.items.length - 3} more items</p>` : ''}
            </div>

            <!-- Shipping Address -->
            <div class="shipping-info">
              <h3 style="margin-top: 0;">🚚 Delivery Address</h3>
              <div class="address-block">
                <strong>${props.shippingAddress.firstName} ${props.shippingAddress.lastName || ''}</strong><br>
                ${props.shippingAddress.line1}<br>
                ${props.shippingAddress.line2 ? `${props.shippingAddress.line2}<br>` : ''}
                ${props.shippingAddress.city}, ${props.shippingAddress.state} ${props.shippingAddress.postalCode}<br>
                ${props.shippingAddress.country}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              ${props.trackingUrl ? `<a href="${props.trackingUrl}" class="button button-primary">Track Package</a>` : ''}
              <a href="${props.orderTrackingUrl}" class="button button-primary">View Order</a>
              <a href="${props.supportUrl}" class="button button-secondary">Contact Support</a>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p><strong>Questions?</strong> <a href="${props.supportUrl}">Contact our support team</a></p>
              <p>This email was sent to ${props.email}</p>
              <p style="margin-top: 20px;">
                &copy; ${new Date().getFullYear()} Relay. All rights reserved.<br>
                <small>Order #${props.orderNumber}${props.trackingCode ? ` • Tracking: ${props.trackingCode}` : ''}</small>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending order status email:', error);
      return { status: "ERROR", error: `Failed to send email: ${error.message}` };
    }

    return { status: "SUCCESS", data };

  } catch (error) {
    console.error('Error in sendOrderStatusEmail:', error);
    return { status: "ERROR", error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to get status-specific content
function getStatusContent(status: string) {
  const statusMap = {
    out_for_delivery: {
      icon: '🚚',
      title: 'Out for Delivery',
      subtitle: 'Your package is on its way!',
      badgeText: 'Out for Delivery',
      subject: 'Your Order is Out for Delivery',
      trackingTitle: '📦 Delivery in Progress',
      infoTitle: '🎯 Almost There!',
      infoContent: 'Your package is currently out for delivery and should arrive today. Please ensure someone is available to receive the package.',
      additionalInfo: 'If you\'re not available, the carrier may leave a delivery notice with instructions for pickup or redelivery.'
    },
    delivered: {
      icon: '✅',
      title: 'Delivered Successfully',
      subtitle: 'Your order has been delivered!',
      badgeText: 'Delivered',
      subject: 'Your Order Has Been Delivered',
      trackingTitle: '📦 Delivery Confirmed',
      infoTitle: '🎉 Delivery Complete!',
      infoContent: 'Your package has been successfully delivered. We hope you love your new items!',
      additionalInfo: 'If you didn\'t receive your package or have any concerns, please contact our support team immediately.'
    },
    exception: {
      icon: '⚠️',
      title: 'Delivery Update Required',
      subtitle: 'There\'s an issue with your delivery',
      badgeText: 'Delivery Exception',
      subject: 'Action Required - Delivery Exception',
      trackingTitle: '📦 Delivery Exception',
      infoTitle: '🔄 Delivery Exception',
      infoContent: 'There was an issue with delivering your package. This could be due to an incorrect address, recipient not available, or other delivery constraints.',
      additionalInfo: 'Please check the tracking information for specific details and contact us if you need assistance resolving this issue.'
    },
    failure: {
      icon: '❌',
      title: 'Delivery Failed',
      subtitle: 'We couldn\'t deliver your package',
      badgeText: 'Delivery Failed',
      subject: 'Delivery Failed - Immediate Action Required',
      trackingTitle: '📦 Delivery Failed',
      infoTitle: '🚨 Delivery Failed',
      infoContent: 'Unfortunately, we were unable to deliver your package. This may be due to multiple failed delivery attempts or an undeliverable address.',
      additionalInfo: 'Please contact our support team immediately so we can resolve this issue and arrange for redelivery or package pickup.'
    }
  };

  return statusMap[status as keyof typeof statusMap] || {
    icon: '📦',
    title: 'Order Update',
    subtitle: 'Your order status has been updated',
    badgeText: 'Status Update',
    subject: 'Order Status Update',
    trackingTitle: '📦 Tracking Information',
    infoTitle: '📋 Order Update',
    infoContent: 'Your order status has been updated. Please check the tracking information for the latest details.',
    additionalInfo: null
  };
}

// Helper function for image URLs (reuse from existing code)
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