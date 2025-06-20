import {auth} from "@/auth";
import { UserType } from "@/globalTypes";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const session = await auth();
        console.log("session", session);
        const user = session?.user as UserType;
        console.log("user", user);
        const userId = user.id;

        const stripeCustomer = await stripe.customers.create({
            email: user.email,
            name: user.name || undefined,
            metadata: {
              userId: user.id,
            },
          });
      
          // Update user with Stripe customer ID
          await prisma.user.update({
            where: { id: user.id },
            data: { stripeCustomerId: stripeCustomer.id },
          });
      
          console.log(`Created Stripe customer ${stripeCustomer.id} for user ${user.id}`);
          return NextResponse.json({
            status: "SUCCESS",
            error: "",
            data: { stripeCustomerId: stripeCustomer.id }
          }, {status: 200})        
        
    } catch (error) {
        console.error('Failed to create Stripe customer:', error);
        return NextResponse.json({
            status: "ERROR",
            error: "Failed to create Stripe customer"
        }, {status: 500})
    }
}