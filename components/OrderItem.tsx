"use client";
import React from 'react'
import { urlFor } from '@/sanity/lib/client';
import Image from 'next/image';

const OrderItem = ({orderItem}: {orderItem: any}) => {
    console.log("orderItem", orderItem);

    const {images, productTitle, quantity, unitPrice, variantColor, variantSize} = orderItem;
    const getImageUrl = (image: string) => {
        if (typeof image === 'object') {
            return urlFor(image).url();
        }
        const imageRef = JSON.parse(image);
        return urlFor(imageRef).url();
    }

    
  return (
    <div className="flex flex-col w-full gap-y-2 bg-gray-50 rounded-md">
        <div className="flex flex-row w-full gap-x-2 min-h-[100px] max-h-[200px]">
            <div className="flex flex-col w-2/5 rounded-md overflow-hidden">
                <Image src={getImageUrl(images)} alt={productTitle} width={100} height={100} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-1 pb-3 pl-3 pr-3 gap-y-2">
                <p className="font-plex-sans font-bold text-[18px] xs:text-[24px] md:text-[32px]">
                    {productTitle}
                </p>
                <div className="flex flex-row flex-1 justify-between">
                <div className="flex flex-col">
                    <p className="font-plex-sans font-bold text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] text-gray-600">
                        color: {variantColor}
                    </p>
                    <p className="font-plex-sans font-bold text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] text-gray-600">
                        size: {variantSize}
                    </p>
                    <p className="font-plex-sans font-bold text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] text-gray-600">
                        quantity: {quantity}
                    </p>
                </div>
                <div className="flex justify-end items-end">
                    <p className="font-plex-sans font-bold text-[14px] xs:text-[20px] sm:text-[24px] md:text-[28px]">
                        ${Math.round(unitPrice/100)}
                    </p>
                </div>
                </div>
                
                
            </div>
        </div>

    </div>
  )
}

export default OrderItem