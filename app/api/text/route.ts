import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST() {
    const name = "ramon";
    const email = "ramando@gmail.com";
    const newUser = await prisma.user.create({
        data: {
            name,
            email
        }
    })

    return NextResponse.json(newUser);
}