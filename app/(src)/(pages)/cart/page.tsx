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

const CartPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const path = (await params).id || "/";
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || "";
  const cookieJar = await cookies();
  const temp_cartId = cookieJar.get("temp_cartId")?.value || "";
  let cartItems: BasketType[] = [];

  const theCart = await getCart(userId || "", temp_cartId);
  if (!theCart) {
    cartItems = [];
  } else {
    cartItems = theCart.cart;
  }

  const cartId = theCart.cartId;

  return (
    <>
    {!cartItems || cartItems.length == 0 ? (
      <div className="flex flex-col flex-1 w-full min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] items-center justify-center border border-gray-300 border-[1px] rounded-md shadow-md p-5"> 
      <div className="flex flex-col w-full h-full items-center justify-center gap-y-4 max-w-xl">
        <p className="font-plex-sans text-[28px] xs:text-[38px] md:text-[45px] font-extrabold">
          Oops! Looks like your cart is empty.
        </p>
        <p className="font-plex-sans text-[16px] xs:text-[18px] md:text-[20px] text-gray-500">
          You can add items to your cart by clicking the Add to Cart button on the product page.
        </p>
        <Link href="/">
          <p className="font-plex-sans text-[16px] xs:text-[18px] md:text-[20px] text-gray-500 px-2 py-1 border border-gray-500 rounded-md transition-all duration-300 hover:bg-gray-300 hover:text-white">
            Go to Home
          </p>
        </Link>
      </div>
    </div>
    ) : (
                <main className="relative pt-[5rem] md:pt-[1.5rem] min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row w-full py-5 px-5 sm:px-20 gap-x-5">
                <div className="flex flex-col w-full min-h-0 gap-y-3">
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
                    </div>
                    
                  
                  
                  {/* Cart items container with proper height management */}
                  <div className={`flex flex-col w-full justify-start overflow-y-auto scrollbar-hidden bg-gray-50 flex-1 lg:max-h-[calc(100vh-10rem)] p-3 sm:p-5 border border-gray-300 border-[1px] rounded-md shadow-md pb-3 lg:pb-0 ${cartItems && cartItems.length > 0 ? 'flex-1 lg:max-h-[calc(100vh-10rem)]' : 'hidden'}`}>
                  <div className="flex flex-col w-full">
                    <p className="font-plex-sans text-[28px] xs:text-[38px] md:text-[45px] font-bold">
                      Your Cart
                    </p>  
                  </div>
                    {cartItems && cartItems.length > 0 && cartItems.map((item: BasketType) => (
                      <Suspense key={item.id} fallback={<div>Loading...</div>}>
                        <BasketBlock key={item.id} userId={userId} item={item} cartId={cartId} temp_cartId={temp_cartId}/>
                      </Suspense>
                    ))}
                  </div>
                </div>
                
                {/* Summary will take its natural height */}
                <Suspense fallback={<div>Loading...</div>}>
                  <SummaryDisplay userId={userId} path={path} cartItems={cartItems} cartId={cartId} temp_cartId={temp_cartId} />
                </Suspense>
              </main>

              
            )}
  </>);
};

export default CartPage;