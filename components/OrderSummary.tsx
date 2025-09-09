import React from 'react'
import RefundButton from './RefundButton';
import { OrderReturnType } from '@/globalTypes';
import { formatDate } from '@/lib/utils';

const OrderSummary = ({order, userId, paymentIntentId, stripeSessionId, path}: {order: OrderReturnType, userId: string, paymentIntentId: string, stripeSessionId: string, path: string}) => {
    const { promoCodeUsed, promoDiscount, address, firstName, lastName, taxAmount, trackingCode, trackingUrl, labelUrl, deliveryDate, carrier} = order;
    console.log("order", order);

    const {line1, city, state, postalCode} = address;
  return (
    <div className="flex flex-col w-full gap-y-4 border border-gray-200 rounded-md p-3 shadow-md bg-gray-50">
        <div className="flex flex-row w-full justify-between items-center">
        <p className="font-plex-sans font-bold text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px]">Order Receipt</p>
        <RefundButton userId={userId} path={path} paymentIntentId={paymentIntentId} stripeSessionId={stripeSessionId}/>
        </div>
        <div className="flex flex-col gap-y-2 first:border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
            <p className="font-plex-sans font-bold text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px]">Order Details</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Order ID: {order.id}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Order Date: {formatDate(order.createdAt)}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Order Total: ${Math.round(order.amountTotal/100)}</p>
        </div>
        <div className="flex flex-1 flex-col gap-y-2">
            <p className="font-plex-sans font-bold text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px]">Shipping Details</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Shipping Method: {carrier}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Tracking Code: {trackingCode}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Tracking URL: {trackingUrl}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Label URL: {labelUrl}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Delivery Date: {formatDate(deliveryDate)}</p>
        </div>
        <div className="flex flex-1 flex-col gap-y-2">
            <p className="font-plex-sans font-bold text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px]">Billing Details, Taxes, and Personal Information</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">First Name: {firstName}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Last Name: {lastName}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Billing Address: {line1}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Billing City: {city}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Billing State: {state}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Billing Zip: {postalCode}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Taxes: ${Math.round(taxAmount/100)}</p>
    
        </div>
        <div className="flex flex-1 flex-col gap-y-2">
            <p className="font-plex-sans font-bold text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px]">Promo Code</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Promo Code Used: {promoCodeUsed}</p>
            <p className="font-plex-sans font-regular text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px]">Promo Discount: ${Math.round((promoDiscount || 0)/100)}</p>
        </div>
    </div>
  )
}

export default OrderSummary