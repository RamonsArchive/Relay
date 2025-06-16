import { auth } from '@/auth';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import { BasketType } from '@/globalTypes';
import { getCart } from '@/lib/serverActions';
import { Slash } from 'lucide-react';
import Link from 'next/link';
import BasketBlock from '@/components/BasketBlock';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const experimental_ppr = true;

const CartPage = async () => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || "";

  const cookieJar = await cookies();
  let temp_cartId = cookieJar.get("temp_cartId")?.value || "";

  let cartItems: BasketType[] = [];
  const theCart = await getCart(userId || "", temp_cartId);
  
  if (!theCart) {
    cartItems = [];
  } else {
    cartItems = theCart.cart;
  }
  const cartId = theCart.cartId;


  
  return <main className="relative h-[calc(100vh-8rem)] flex flex-col w-full min-h-0 py-5 px-5 sm:px-20">
    <div className="flex flex-col gap-x-2 items-center sm:items-start justify-start h-full w-full overflow-y-auto scrollbar-hidden">
      <div className="flex flex-row w-full">
      <div className="flex flex-row items-center transform transition-all duration-300 ease-in-out gap-x-1">
        <Link href="/">
        <p className="font-plex-sans text-gray-600 hover:text-gray-400 font-bold text-[12px] xs:text-[14px] md:text-[16px]">
          Home
        </p>
        </Link>
        <Slash className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex flex-row items-center transform transition-all duration-300 ease-in-out gap-x-1">
        <Link href="/cart">
          <p className="font-plex-sans font-bold text-gray-800 hover:text-gray-600 text-[12px] xs:text-[14px] md:text-[16px]">
            Cart
          </p>
        </Link>
        </div>
      </div>

      <div className="flex flex-col w-full h-full w-full">
        {cartItems.length == 0 ? <div className="flex items-center justify-center h-full w-full"> 
          <div className="flex flex-col w-full h-full items-center justify-center gap-y-4 max-w-xl">
          <p className="font-plex-sans text-[28px] xs:text-[38px] md:text-[45px] font-extrabold">
            Oops! Looks like your cart is empty. 
          </p>
          <p className="font-plex-sans text-[16px] xs:text-[18px] md:text-[20px] text-gray-500">
            You can add items to your cart by clicking the "Add to Cart" button on the product page.
          </p> 
          <Link href="/">
            <p className="font-plex-sans text-[16px] xs:text-[18px] md:text-[20px] text-gray-500 px-2 py-1 border border-gray-500 rounded-md transition-all duration-300 hover:bg-gray-500 hover:text-white">
              Go to Home
            </p>
          </Link>
          </div>

        </div> : <p className="font-plex-sans text-[28px] xs:text-[38px] md:text-[45px] font-extrabold">
          Your Cart
        </p>}
        
        <div className="flex flex-col w-full h-full justify-start">
          {cartItems.map((item: BasketType) => (
            <Suspense key={item.id} fallback={<div>Loading...</div>}>
              <BasketBlock key={item.id} userId={userId} item={item} cartId={cartId} temp_cartId={temp_cartId}/>
            </Suspense>
          ))}
        </div>    
      </div>
      </div>
    </main>;
};

export default CartPage;

