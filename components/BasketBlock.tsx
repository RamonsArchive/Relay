"use client";
import { BasketType } from '@/globalTypes'
import React, { Suspense } from 'react'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/client';
import { Trash2 } from 'lucide-react';
import BasketQuantitySelector from './BasketQuantitySelector';
const BasketBlock = ({userId, item, index, cartLength, temp_cartId}: {userId: string, item: BasketType, index: number, cartLength: number, temp_cartId: string | null}) => {
    const {productId, title, color, size, images, price, stockQuantity, lineSubtotal, quantity} = item;

    let mainImage = null;
    if (Array.isArray(images) && images.length > 0) {
        mainImage = urlFor(images[0] as string).url();
    } else {
        mainImage = '/placeholder.png';
    }

  return (
    <div className={`flex flex-row gap-y-2 w-full h-full max-h-[300px] gap-x-5 justify-start pt-5 ${index === cartLength ? "pb-0" : index === 0 ? "pt-0 border-b-[1px] pb-5 border-gray-400" : "border-b-[1px] pb-5 border-gray-400"}`}>
        <div className="flex w-1/3 h-full">
            <Image src={mainImage} alt={"main image"} width={100} height={100} className="object-cover w-full h-full" />
        </div>

        <div className="flex flex-1 w-full h-full w-full">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-x-2 items-center">
                    <p className="font-plex-sans text-[18px] xs:text-[22px] md:text-[26px] font-bold">
                        {title}
                    </p>
                    <Trash2 className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer" />
                </div>
                <div className="flex flex-row gap-x-2">
                    <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] font-bold">
                        Size: 
                    </p>
                    <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] text-gray-500 font-bold">
                        {size}
                    </p>
                </div>
                <div className="flex flex-row gap-x-2">
                    <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] font-bold">
                        Color: 
                    </p>
                    <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] text-gray-500 font-bold">
                        {color}
                    </p>
                </div>
                <div className="flex flex-row gap-x-5 items-center">
                    <p className="font-plex-sans text-[18px] xs:text-[20px] md:text-[22px] text-gray-500 font-bold">
                        ${lineSubtotal ? lineSubtotal : price}
                    </p>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BasketQuantitySelector productId={productId} quantity={quantity} stockQuantity={stockQuantity} userId={userId} temp_cartId={temp_cartId} />
                    </Suspense>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BasketBlock