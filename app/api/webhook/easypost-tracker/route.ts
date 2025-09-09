import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseServerActionResponse } from "@/lib/utils";
import { sendOrderStatusEmail } from "@/lib/orderStatusEmail";
import { EasyPostTracker } from "@/globalTypes";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        // Get raw body for signature verification
        const rawBody = await request.text();
        const body = JSON.parse(rawBody);
                
        const signature = request.headers.get("x-hmac-sha256");
        const secret = process.env.EASYPOST_TRACKER_WEBHOOK_SECRET;

        // If secret is configured, verify the signature
        if (secret) {
        if (!signature) {
            return NextResponse.json(
            { status: "ERROR", error: "Missing signature" }, 
            { status: 400 }
            );
        }

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(rawBody)
            .digest('hex');

        if (signature !== expectedSignature) {
            console.error("Invalid webhook signature");
            return NextResponse.json(
            { status: "ERROR", error: "Invalid signature" }, 
            { status: 401 }
            );
            }
        }

        if (body.object === "Event" && body.description === "tracker.updated") {
            const updateResult = await handleTrackingUpdate(body.result);
            if (updateResult.status === "ERROR") {
                console.error("Failed to update tracking", updateResult.error);
                return NextResponse.json({ status: "ERROR", error: "Failed to update tracking" }, { status: 500 })
            }
        }
        

        return NextResponse.json({ status: "SUCCESS", message: "Tracking webhook received" }, { status: 200 })
    } catch (error) {
        console.error("Failed to update order", error);
        return NextResponse.json({ status: "ERROR", error: "Failed to update order" }, { status: 500 })
    }
}

const handleTrackingUpdate = async (tracker: EasyPostTracker) => {
    try {

        const order = await prisma.order.findFirst({
            where: {
                trackingCode: tracker.tracking_code
            },
            include: {
                items: true,
            }
        })

        if (!order) {
            console.error("Order not found", tracker.tracking_code);
            return parseServerActionResponse({
                status: "ERROR",
                error: "Order not found"
            })
        }

        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: {
              status: tracker.status_detail,
              estimatedDelivery: tracker.est_delivery_date,
              updatedAt: new Date()
            }
          });

          if (!updatedOrder) {
            console.error("Failed to update order", tracker.tracking_code);
            return parseServerActionResponse({
                status: "ERROR",
                error: "Failed to update order"
            })
          }

          const importantStatuses = ['out_for_delivery', 'delivered', 'exception', 'failure'];
          if (importantStatuses.includes(tracker.status_detail)) {
            const emailResult = await sendOrderStatusEmail(updatedOrder);

            if (emailResult.status === "ERROR") {
                console.error("Failed to send order status email", emailResult.error);
                return parseServerActionResponse({
                    status: "ERROR",
                    error: "Failed to send order status email"
                })
            }
          }

          return parseServerActionResponse({
            status: "SUCCESS",
            message: "Tracking updated successfully"
          })

    } catch (error) {
        console.error("Failed to update tracking", error);
        return parseServerActionResponse({
            status: "ERROR",
            error: "Failed to update tracking"
        })
    }
}