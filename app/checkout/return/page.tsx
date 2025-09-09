import React, { Suspense } from 'react'
import Link from 'next/link'
import { auth } from '@/auth';
import { fetchLastCompleteOrder } from '@/sanity/lib/actions';
import OrderItem from '@/components/OrderItem';
import OrderSummary from '@/components/OrderSummary';
import { OrderItemReturnType } from '@/globalTypes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const experimental_ppr = true;

const page = async ({params, searchParams}: {params: Promise<{path: string}>, searchParams: Promise<{session_id: string}>}) => {
  const path = (await params).path || "/";
  const stripeSessionId = (await searchParams).session_id || "";

  const session = await auth();
  const sessionId = session?.user;
  const userId = sessionId?.id|| "";
  await new Promise(resolve => setTimeout(resolve, 8000)); // 8 second delay
  const lastStripeSession = await fetchLastCompleteOrder(userId, stripeSessionId);
  console.log("Full response:", JSON.stringify(lastStripeSession, null, 2)); 
  const orders = lastStripeSession.data.stripeSession.items;
  const paymentIntentId = lastStripeSession.data.stripeSession.paymentIntentId;

  return (
    <>
    {lastStripeSession.data.stripeSession.status !== "refunded" ? (
    <div className="flex flex-col w-full pt-[1.5rem] md:pt-[3] min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] px-5 items-center pb-10">
        <div className="flex flex-col items-center w-full max-w-[800px] gap-y-5">
            <div className="flex flex-col w-full gap-y-2 items-center">
              <div className="flex flex-col gapy-y-3 items-center justify-center border border-gray-200 rounded-md p-4 bg-primary-200 transition-scale duration-300 ease-in-out hover:scale-105 active:scale-95">
                <p className="font-plex-sans font-bold text-[24px] xs:text-[32px] md:text-[48px] text-white text-center">
                    Thank you for your purchase! 🎉
                </p>
                <p className="font-plex-sans font-bold text-[16px] xs:text-[18px] md:text-[20px] text-white text-center">
                    Your order has been placed successfully.
                </p>
                </div>
            </div>
            <div className="flex flex-row w-full max-w-xl border border-gray-200 rounded-md shadow-md bg-gray-50 overflow-hidden">
            <Link href="/" className="flex-1">
              <button className="w-full h-full py-4 font-plex-sans text-[16px] xs:text-[18px] sm:text-[20px] md:text-[24px] font-bold bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 transition-all duration-300 ease-in-out border-r border-gray-400">
                Continue Shopping
              </button>
            </Link>
            <Link href="/orders" className="flex-1">
              <button className="w-full h-full py-4 font-plex-sans text-[16px] xs:text-[18px] sm:text-[20px] md:text-[24px] font-bold bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 transition-all duration-300 ease-in-out">
                Orders Page
              </button>
            </Link>
          </div>
            <div className="flex flex-col w-full gap-y-3 md:border md:border-gray-200 shadow-none border-none rounded-md p-0 md:p-3 md:bg-primary-200 md:shadow-md">
              <OrderSummary order={lastStripeSession.data.stripeSession} userId={userId} paymentIntentId={paymentIntentId} stripeSessionId={stripeSessionId} path={path}/> 
            <div className="flex flex-col w-full gap-y-3 border border-gray-200 rounded-md p-0 pt-3 md:p-3 shadow-md bg-gray-50">
              <p className="font-plex-sans font-bold text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] text-start pl-3 md:pl-0">Order Items</p>
            {orders ? orders.map((orderItem: OrderItemReturnType, index: number) => (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <div className="[&:not(:last-child)]:border-b-[1px] border-gray-300 pb-3">
                <OrderItem orderItem={orderItem}/>
                </div>
              </Suspense>
             
            )) : <div className="flex items-center justify-centerfont-plex-sans text-gray-600 font-bold text-[18px] xs:text-[20px] md:text-[24px] text-center">No orders</div>}
            </div>
            </div>
        </div>
    </div>
    ) : (
      <div className="flex flex-col w-full pt-[1.5rem] md:pt-[3] min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] px-5 items-center pb-10">
        <div className="flex flex-col items-center w-full max-w-[800px] gap-y-5">
          <div className="flex flex-col w-full gap-y-2 items-center">
            <div className="flex flex-col gapy-y-3 items-center justify-center border border-gray-200 rounded-md p-4 bg-primary-200 transition-scale duration-300 ease-in-out hover:scale-105 active:scale-95">
              <p className="font-plex-sans font-bold text-[24px] xs:text-[32px] md:text-[48px] text-white text-center">
                Refunded
              </p>
              <p className="font-plex-sans font-bold text-[16px] xs:text-[18px] md:text-[20px] text-white text-center">
                Your order has been refunded!
              </p>
            </div>
            <div className="flex flex-col w-full gap-y-3 items-center">
                  <div className="flex flex-row w-full max-w-md border border-gray-200 rounded-md shadow-md bg-gray-50 overflow-hidden">
                  <Link href="/" className="flex-1">
                    <button className="w-full h-full py-2 font-plex-sans text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] font-bold bg-primary-200 text-white hover:bg-gray-600 active:bg-gray-700 transition-all duration-300 ease-in-out border-r border-gray-400">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
                </div>
          </div>
        </div>
      </div>
    )
}</>)
}

export default page