import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
    const name = "ramon";
    const email = "ramos@gmail.com";
    const newUser = await prisma.user.create({
        data: {
            name,
            email
        }
    })

    return NextResponse.json(newUser);
}