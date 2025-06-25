import React, { Suspense } from 'react'
import OrderDetails from '@/components/OrderDetails'
import Link from 'next/link'
import { auth } from '@/auth';
import { fetchLastCompleteOrder } from '@/sanity/lib/actions';


const page = async ({searchParams}: {searchParams: Promise<{session_id: string}>}) => {
  const stripeSessionId = (await searchParams).session_id || "";
  console.log("stripeSessionId", stripeSessionId);

  const session = await auth();
  const sessionId = session?.user;
  const userId = sessionId?.id|| "";
  const orders = await fetchLastCompleteOrder(userId, stripeSessionId);
  console.log("orders", orders);


  return (
    <div className="flex flex-col w-full pt-[1.5rem] md:pt-[0] min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] px-5 items-center">
        <div className="flex flex-col w-full max-w-[800px] gap-y-5">
            <div className="flex flex-col w-full gap-y-2 items-center">
              <div className="flex flex-col gapy-y-3 items-center justify-center border border-gray-200 rounded-lg p-4 bg-primary-200 transition-scale duration-300 ease-in-out hover:scale-105 active:scale-95">
                <p className="font-plex-sans text-gray-600 font-bold text-[24px] xs:text-[32px] md:text-[48px] text-primary-100 text-center">
                    Thank you for your purchase! 🎉
                </p>
                <p className="font-plex-sans text-gray-600 font-bold text-[16px] xs:text-[18px] md:text-[20px] text-primary-100 text-center">
                    Your order has been placed successfully.
                </p>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
             <OrderDetails userId={userId} stripeSessionId={stripeSessionId}/>
             </Suspense>

            <div className="flex flex-row w-full items-center justify-center border border-gray-200 rounded-lg shadow-md gap-y-3">
              <Link href="/">
              <button className="font-plex-sans text-regular py-1 px-2 w-1/2 font-bold text-[22px] xs:text-[26px] md:text-[32px] hover:bg-gray-50 transition-all duration-300 ease-in-out">
                Continue Shopping
              </button>
              </Link>
              <Link href="/orders">
              <button className="font-plex-sans text-regular py-1 px-2 flex-1 font-bold text-[22px] xs:text-[26px] md:text-[32px] hover:bg-gray-50 transition-all duration-300 ease-in-out">
                Orders Page
              </button>
              </Link>
            </div>



        </div>
    </div>
  )
}

export default page