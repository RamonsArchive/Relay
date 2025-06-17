import { auth } from '@/auth';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import { BasketType } from '@/globalTypes';
import { getCart } from '@/lib/serverActions';
import { Slash } from 'lucide-react';
import Link from 'next/link';
import BasketBlock from '@/components/BasketBlock';
import SummaryDisplay from '@/components/SummaryDisplay';

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

  return (
    <main className="relative min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row w-full py-5 px-5 sm:px-20 gap-x-5">
      <div className="flex flex-col w-full min-h-0">
        <div className="flex flex-col gap-x-2 items-center sm:items-start justify-start w-full">
          <div className="flex flex-row w-full">
            <div className="flex flex-row items-center transform transition-all duration-300 ease-in-out gap-x-1">
              <Link href="/">
                <p className="font-plex-sans text-gray-600 hover:text-gray-400 font-bold text-[14px] xs:text-[16px] md:text-[18px]">
                  Home
                </p>
              </Link>
              <Slash className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-row items-center transform transition-all duration-300 ease-in-out gap-x-1">
              <Link href="/cart">
                <p className="font-plex-sans font-bold text-gray-800 hover:text-gray-600 text-[14px] xs:text-[16px] md:text-[18px]">
                  Cart
                </p>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col w-full">
            {!cartItems || cartItems.length == 0 ? (
              <div className="flex items-center justify-center h-full w-full min-h-[50vh]">
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
              </div>
            ) : (
              <p className="font-plex-sans text-[28px] xs:text-[38px] md:text-[45px] font-extrabold">
                Your Cart
              </p>
            )}
          </div>
        </div>
        
        {/* Cart items container with proper height management */}
        <div className="flex flex-col w-full flex-1 lg:max-h-[calc(100vh-18rem)] justify-start overflow-y-auto scrollbar-hidden p-5 border border-gray-300 border-[1px] rounded-md shadow-md mt-4 pb-20 lg:pb-0">
          {cartItems && cartItems.map((item: BasketType) => (
            <Suspense key={item.id} fallback={<div>Loading...</div>}>
              <BasketBlock key={item.id} userId={userId} item={item} cartId={cartId} temp_cartId={temp_cartId}/>
            </Suspense>
          ))}
        </div>
      </div>
      
      {/* Summary will take its natural height */}
      <SummaryDisplay cartItems={cartItems} cartId={cartId} userId={userId}/>
    </main>
  );
};

export default CartPage;