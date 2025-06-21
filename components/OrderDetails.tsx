import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchOrderDetails } from '@/sanity/lib/actions'


const OrderDetails = ({userId, stripeSessionId}: {userId: string, stripeSessionId: string}) => {
    if (!stripeSessionId) {
        throw new Error("No stripeSessionId");
    }

    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const result = await fetchOrderDetails(userId, stripeSessionId);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        getOrderDetails();
    }, [stripeSessionId])


  return (
    <div className="flex flex-col w-full gap-y-2">
    <div className="flex flex-col w-full justify-start border border-gray-200 rounded-lg px-4 py-2 shadow-md gap-y-3">
      <div className="flex flex-col w-full items-start justify-start">
      <p className="font-plex-sans text-regular font-bold text-[22px] xs:text-[26px] md:text-[32px]">
        Order Details
      </p>
      </div>
      <div className="flex flex-col w-full gap-y-2">
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex flex-col w-full items-start justify-start">
          <p className="font-plex-sans text-regular font-bold text-[22px] xs:text-[26px] md:text-[32px]">
            Order Details
          </p>
        </div>
      </div>

    </div>
    </div>

  </div>
  )
}

export default OrderDetails