import { auth } from '@/auth';
import { clientRateLimiter } from '@/lib/rateLimiter';
import { redis } from '@/upstash/Redis';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const result = await redis.get("foo");
    const session = await auth();
    const userId = session?.user?.id || ""

    const rateLimitResult = await clientRateLimiter.limit(`${userId}:text`);

    return NextResponse.json({ result, rateLimitResult });
}