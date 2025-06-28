"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        const cookieJar = await cookies();
        const userId = session?.user?.id;
        const temp_cartId = cookieJar.get("temp_cartId")?.value;
        const findCartBy = userId ? {userId: userId} : {tempCartId: temp_cartId};

        // valid state after sync is complete
        if (!userId && !temp_cartId) {
            return NextResponse.json({count: 0}, {status: 200});
        }

        const cart = await prisma.cart.findUnique({
            where: findCartBy,
            include: {
                items: true,
            }
        })
        const count = cart?.items?.length || 0;

        return NextResponse.json({count}, {status: 200});

    } catch (error) {
        console.error("Error fetching basket count", error);
        return NextResponse.json({error: "Failed to fetch basket count"}, {status: 500});
    }
    
}