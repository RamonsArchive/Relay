import React from 'react'
import { Suspense } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const page = () => {
  return (
    <div className="flex flex-col w-full pt-[5rem] md:pt-[1.5rem] min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] px-5 items-center justify-center justify-items-center">
        <div className="flex flex-col w-full gap-y-5">
            <div className="flex flex-col w-full gap-y-2">
                <p className="font-plex-sans text-gray-600 hover:text-gray-400 font-bold text-[14px] xs:text-[16px] md:text-[18px]">
                    Order Successfully Placed
                </p>
            </div>
            <div className="flex flex-col w-full gap-y-2"></div>
        </div>
    </div>
  )
}

export default page