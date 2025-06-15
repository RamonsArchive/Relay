"use server";
import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache'
import React from 'react'
import { auth } from '@/auth';
import { cookies } from 'next/headers';

const BasketCountServer = async () => {
  'use cache';
  let count = 0;
  cacheTag('cart-count');
  try {
    const session = await auth();
    const cookieJar = await cookies();
    const userId = session?.user?.id;
    const temp_cartId = cookieJar.get("temp_cartId")?.value;

    const findCartBy = userId ? {userId: userId} : {tempCartId: temp_cartId};
    if (!findCartBy.userId && !findCartBy.tempCartId) {
        return 0;
    }

    const cart = await prisma.cart.findUnique({
        where: findCartBy,
        include: {
            items: true,
        }

    });
    count = cart?.items?.length || 0;

} catch (error) {
    console.error("Error fetching basket count", error);
    count = 0;
}
  return (
    <div className="text-[12px] sm:text-[14px] md:text-[16px] font-bold absolute bottom-0 right-0">
        {count}
     </div>
  )
}

export default BasketCountServer