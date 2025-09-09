import { Resend } from "resend";
import { parseServerActionResponse } from "./utils";

const resend = new Resend(process.env.RESEND_API_KEY);

// Type matching your actual Prisma query
interface OrderFromDb {
  id: number;
  status: string;
  orderEmail: string;
  firstName: string;
  lastName: string;
  amountTotal: number;
  currency: string;
  createdAt: Date;
  items: Array<{
    productTitle: string;
    variantSize: string | null;
    variantColor: string | null;
    quantity: number;
    unitPrice: number;
    images: any; // JsonValue
  }>;
  user: {
    id: string;
    email: string;
    name: string | null;
  } | null;
}

// Helper function to create variant string from size and color
const createVariantString = (size: string | null, color: string | null): string => {
  const parts = [color, size].filter(Boolean);
  return parts.length > 0 ? parts.join(' - ') : 'Default';
};

// Helper function for customer-friendly error messages
const getCustomerFriendlyReason = (errorType: string): { title: string; explanation: string } => {
  switch (errorType) {
    case 'INVENTORY_ERROR':
      return {
        title: 'Item Unavailable',
        explanation: 'Unfortunately, one or more items in your order became unavailable after you placed it.'
      };
    case 'CART_INVALID':
      return {
        title: 'Order Processing Issue',
        explanation: 'We encountered an issue with your order contents during processing.'
      };
    case 'SHIPPING_LABEL_FAILED':
      return {
        title: 'Shipping Service Unavailable',
        explanation: 'We were unable to process shipping for your order due to a carrier service issue.'
      };
    case 'PROCESSING_ERROR':
      return {
        title: 'Technical Issue',
        explanation: 'We experienced a technical issue while processing your order.'
      };
    case 'CUSTOMER_REQUEST':
      return {
        title: 'Customer Request',
        explanation: 'You have requested a refund for your order.'
      };
    default:
      return {
        title: 'Order Issue',
        explanation: 'We encountered an issue with your order and have processed a full refund.'
      };
  }
};

export async function sendRefundEmail(
  order: OrderFromDb, 
  refund: any, 
  errorType: string = 'CUSTOMER_REQUEST'
) {
  try {
    if (!order) {
      console.error('Order not provided');
      return parseServerActionResponse({
        status: "ERROR",
        error: "Order not provided"
      });
    }

    // Extract customer information
    const customerEmail = order.orderEmail || order.user?.email;
    const customerName = `${order.firstName} ${order.lastName}`.trim() || order.user?.name || 'Valued Customer';
    const orderNumber = `#${order.id.toString().padStart(6, '0')}`;

    if (!customerEmail) {
      console.error('No customer email found in order');
      return parseServerActionResponse({
        status: "ERROR",
        error: "No customer email found"
      });
    }

    // Get customer-friendly error reason
    const { title, explanation } = getCustomerFriendlyReason(errorType);

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Update with your domain
      to: customerEmail,
      subject: `Refund Processed - Order ${orderNumber}`,
      html: generateRefundEmailHTML({
        customerName,
        orderNumber,
        refundAmount: order.amountTotal / 100, // Convert from cents
        currency: order.currency.toUpperCase(),
        refundId: refund.id,
        errorTitle: title,
        errorMessage: explanation,
        originalOrderDate: order.createdAt.toLocaleDateString(),
        items: order.items.map(item => ({
          productTitle: item.productTitle,
          variant: createVariantString(item.variantSize, item.variantColor),
          quantity: item.quantity,
          unitPrice: item.unitPrice / 100, // Convert from cents
        }))
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return parseServerActionResponse({
        status: "ERROR",
        error: error.message
      });
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      data: { emailSent: true, orderId: order.id }
    });

  } catch (error) {
    console.error('Error sending refund email:', error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to send refund email"
    });
  }
}

// Simplified email HTML template
function generateRefundEmailHTML(data: {
  customerName: string;
  orderNumber: string;
  refundAmount: number;
  currency: string;
  refundId: string;
  errorTitle: string;
  errorMessage: string;
  originalOrderDate: string;
  items: Array<{
    productTitle: string;
    variant: string;
    quantity: number;
    unitPrice: number;
  }>;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Refund Processed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
        .header { background: #dc3545; color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; }
        .alert-box { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0; }
        .refund-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; }
        .item { border-bottom: 1px solid #eee; padding: 15px 0; }
        .item:last-child { border-bottom: none; }
        .timeline { background: #e7f3ff; border-left: 4px solid #007bff; padding: 15px 20px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Refund Processed</h1>
          <p>We've issued a full refund for your order</p>
        </div>

        <div class="content">
          <p>Dear ${data.customerName},</p>
          
          <div class="alert-box">
            <strong>${data.errorTitle}</strong><br>
            ${data.errorMessage}
          </div>
          
          <p>We've automatically processed a full refund for your order:</p>

          <div class="refund-details">
            <h3 style="margin-top: 0; color: #dc3545;">Refund Information</h3>
            
            <div class="detail-row">
              <span>Order Number:</span>
              <strong>${data.orderNumber}</strong>
            </div>
            
            <div class="detail-row">
              <span>Refund Amount:</span>
              <strong>$${data.refundAmount.toFixed(2)} ${data.currency}</strong>
            </div>
            
            <div class="detail-row">
              <span>Refund ID:</span>
              <strong>${data.refundId}</strong>
            </div>
            
            <div class="detail-row">
              <span>Original Order Date:</span>
              <span>${data.originalOrderDate}</span>
            </div>
          </div>
          
          <div class="items-section">
            <h3>Items Refunded</h3>
            ${data.items.map(item => `
              <div class="item">
                <p><strong>${item.productTitle}</strong></p>
                <p style="color: #666; margin: 5px 0;">Variant: ${item.variant}</p>
                <p style="margin: 5px 0;">
                  Quantity: ${item.quantity} × $${item.unitPrice.toFixed(2)}
                </p>
              </div>
            `).join('')}
          </div>
          
          <div class="timeline">
            <h4 style="margin-top: 0;">⏰ What happens next?</h4>
            <p style="margin-bottom: 0;">
              Your refund will appear on your original payment method within 
              <strong>5-10 business days</strong>.
            </p>
          </div>

          <p>We sincerely apologize for any inconvenience. Thank you for your understanding.</p>
          
          <p>
            Best regards,<br>
            <strong>Relay Team</strong>
          </p>
        </div>

        <div class="footer">
          <p>Refund ID: ${data.refundId} | Order: ${data.orderNumber}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}