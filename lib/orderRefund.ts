import { Resend } from "resend";
import { parseServerActionResponse } from "./utils";
import { RefundType } from "@/globalTypes";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

// Types for better type safety
interface RefundEmailProps {
  email: string;
  customerName: string;
  orderNumber?: string;
  refundAmount: number;
  currency: string;
  refundId: string;
  errorType: string;
  errorMessage: string;
  originalOrderDate?: string;
  items?: Array<{
    productTitle: string;
    variant?: string;
    quantity: number;
    price: number;
    images?: string | string[] | null;
  }>;
  supportUrl?: string;
  expectedRefundTime?: string;
}

// Helper function to safely extract image URL
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

// Helper function for customer-friendly error messages
const getCustomerFriendlyReason = (errorType: string): { title: string; explanation: string } => {
  switch (errorType) {
    case 'INVENTORY_ERROR':
      return {
        title: 'Item Unavailable',
        explanation: 'Unfortunately, one or more items in your order became unavailable after you placed it. We sincerely apologize for this inconvenience.'
      };
    case 'CART_INVALID':
      return {
        title: 'Order Processing Issue',
        explanation: 'We encountered an issue with your order contents during processing. This is rare, but we\'ve automatically refunded your payment.'
      };
    case 'PROCESSING_ERROR':
      return {
        title: 'Technical Issue',
        explanation: 'We experienced a technical issue while processing your order. Our team has been notified, and we\'ve processed a full refund.'
      };
    default:
      return {
        title: 'Order Issue',
        explanation: 'We encountered an issue with your order and have processed a full refund. We apologize for any inconvenience.'
      };
  }
};

export async function sendRefundEmail(session: any, refund: RefundType, errorType: string) {
  // Extract data from session
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || 'Valued Customer';
  const refundAmount = session.amount_total;
  const currency = session.currency;
  const orderNumber = session.metadata?.orderNumber || session.id.slice(-8).toUpperCase();
  
  if (!customerEmail) {
    console.error('No customer email found in session');
    return parseServerActionResponse({
      status: "ERROR",
      error: "No customer email found"
    });
  }

  // Get line items if available (you might need to fetch these separately)
  const lineItems = session.line_items?.data || [];
  
  const emailProps: RefundEmailProps = {
    email: customerEmail,
    customerName,
    orderNumber,
    refundAmount,
    currency,
    refundId: refund.id,
    errorType,
    errorMessage: refund.metadata?.error_details || 'Order processing issue',
    originalOrderDate: new Date(session.created * 1000).toLocaleDateString(),
    items: lineItems.map((item: any) => ({
      productTitle: item.description || item.price?.product?.name || 'Product',
      variant: item.price?.product?.metadata?.variant || '',
      quantity: item.quantity,
      price: item.amount_total,
      images: item.price?.product?.images || item.price?.product?.metadata?.images
    })),
    supportUrl: process.env.SUPPORT_URL || 'mailto:support@yourstore.com',
    expectedRefundTime: '3-5 business days'
  };

  return await sendRefundEmailWithTemplate(emailProps);
}

async function sendRefundEmailWithTemplate(props: RefundEmailProps) {
  const {
    email,
    customerName,
    orderNumber,
    refundAmount,
    currency,
    refundId,
    errorType,
    originalOrderDate,
    items = [],
    supportUrl,
    expectedRefundTime
  } = props;

  // Format currency helper
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };

  const { title, explanation } = getCustomerFriendlyReason(errorType);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Relay <onboarding@resend.dev>', // Replace with your domain
      to: [email],
      subject: `Refund Processed - Order ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Refund Processed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .email-wrapper { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: #dc3545; color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .header .refund-icon { font-size: 48px; margin-bottom: 10px; }
            .content { padding: 30px 20px; }
            .alert-box { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0; }
            .refund-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; }
            .detail-row.total { font-weight: bold; font-size: 1.1em; border-top: 2px solid #dee2e6; padding-top: 15px; margin-top: 15px; }
            .items-section { margin: 25px 0; }
            .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e9ecef; }
            .items-table th { background: #f8f9fa; font-weight: bold; }
            .product-image { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; }
            .timeline { background: #e7f3ff; border-left: 4px solid #007bff; padding: 15px 20px; margin: 20px 0; }
            .button { display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 15px 0; text-align: center; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 0.9em; }
            .support-info { background: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0; text-align: center; }
            @media (max-width: 600px) {
              .container { padding: 10px; }
              .content { padding: 20px 15px; }
              .detail-row { flex-direction: column; gap: 5px; }
              .items-table { font-size: 0.9em; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <!-- Header -->
              <div class="header">
                <div class="refund-icon">💳</div>
                <h1>Refund Processed</h1>
                <p>We've issued a full refund for your order</p>
              </div>

              <!-- Main Content -->
              <div class="content">
                <p>Dear ${customerName},</p>
                
                <div class="alert-box">
                  <strong>${title}</strong><br>
                  ${explanation}
                </div>

                <p>We've automatically processed a full refund for your order. Here are the details:</p>

                <!-- Refund Details -->
                <div class="refund-details">
                  <h3 style="margin-top: 0; color: #dc3545;">Refund Information</h3>
                  <div class="detail-row">
                    <span>Order Number: </span>
                    <strong>#${orderNumber}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Refund ID: </span>
                    <strong>${refundId}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Original Order Date: </span>
                    <span>${originalOrderDate}</span>
                  </div>
                  <div class="detail-row">
                    <span>Refund Date: </span>
                    <span>${new Date().toLocaleDateString()}</span>
                  </div>
                  <div class="detail-row total">
                    <span>Total Refunded: </span>
                    <span>${formatCurrency(refundAmount)}</span>
                  </div>
                </div>

                ${items.length > 0 ? `
                <!-- Items Section -->
                <div class="items-section">
                  <h3>Refunded Items</h3>
                  <table class="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Details</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${items.map(item => {
                        const imageUrl = getImageUrl(item.images);
                        return `
                        <tr>
                          <td>
                            ${imageUrl ? `<img src="${imageUrl}" alt="${item.productTitle}" class="product-image">` : '<div class="product-image" style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999;">📦</div>'}
                          </td>
                          <td>
                            <strong>${item.productTitle}</strong>
                            ${item.variant ? `<br><small style="color: #666;">${item.variant}</small>` : ''}
                          </td>
                          <td>${item.quantity}</td>
                          <td>${formatCurrency(item.price)}</td>
                        </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
                ` : ''}

                <!-- Timeline -->
                <div class="timeline">
                  <h4 style="margin-top: 0;">⏰ What happens next?</h4>
                  <p style="margin-bottom: 0;">
                    Your refund has been processed and will appear on your original payment method within <strong>${expectedRefundTime}</strong>. 
                    You'll receive a separate confirmation from your bank or payment provider once the refund is complete.
                  </p>
                </div>

                <!-- Support Section -->
                <div class="support-info">
                  <h4>Need Help?</h4>
                  <p>If you have any questions about this refund or need assistance with a new order, our support team is here to help.</p>
                  <a href="${supportUrl}" class="button">Contact Support</a>
                </div>

                <p>We sincerely apologize for any inconvenience this may have caused. We're continuously working to improve our service and prevent such issues in the future.</p>

                <p>Thank you for your understanding.</p>
                
                <p>Best regards,<br>
                <strong>Relay Team</strong></p>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p>This is an automated message regarding your refund. Please keep this email for your records.</p>
                <p>Refund ID: ${refundId} | Order: #${orderNumber}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return parseServerActionResponse({
        status: "ERROR",
        error: `Failed to send refund email: ${error.message}`
      });
    }

    return parseServerActionResponse({
      data,
      status: "SUCCESS",
      message: "Refund email sent successfully"
    });

  } catch (error) {
    console.error('Failed to send refund email:', error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to send refund email"
    });
  }
}