import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import React, { Suspense } from 'react';
import { BasketType } from '@/globalTypes';
import { getCart } from '@/lib/serverActions';
import { Slash } from 'lucide-react';
import Link from 'next/link';
import BasketBlock from '@/components/BasketBlock';
import BasketQuantitySelector from '@/components/BasketQuantitySelector';

const CartPage = async () => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || "";

  const cookieJar = await cookies();
  let temp_cartId = cookieJar.get("temp_cartId")?.value || "";

  const cartItems = await getCart(userId || "", temp_cartId, cookieJar);
  
  return <main className="relative h-[calc(100vh-8rem)] flex flex-col w-full min-h-0 py-5 px-5 sm:px-20">
    <div className="flex flex-col gap-x-2 items-center sm:items-start justify-start h-full w-full overflow-y-auto scrollbar-hidden">
      <div className="flex flex-row  h-full">
      <div className="flex justify-between transform transition-all duration-300 ease-in-out gap-x-1">
        <Link href="/">
        <p className="font-plex-sans text-gray-600 hover:text-gray-400 font-bold text-[12px] xs:text-[14px] md:text-[16px]">
          Home
        </p>
        </Link>
        <Slash className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <div className="flex items-center justify-between transform transition-all duration-300 ease-in-out gap-x-1">
        <Link href="/cart">
          <p className="font-plex-sans font-bold text-gray-800 hover:text-gray-600 text-[12px] xs:text-[14px] md:text-[16px]">
            Cart
          </p>
        </Link>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-y-5 sm:gap-y-3 w-full">
        <p className="font-plex-sans text-[26px] xs:text-[32px] md:text-[36px] font-extrabold">
          Your Cart
        </p>
        <div className="flex flex-col w-full h-full justify-start">
          {cartItems.map((item: BasketType, index: number) => (
            <BasketBlock key={item.productId} userId={userId} item={item} index={index} cartLength={cartItems.length} temp_cartId={temp_cartId}/>
          ))}
        </div>    
      </div>
      </div>
    </main>;
};

export default CartPage;
