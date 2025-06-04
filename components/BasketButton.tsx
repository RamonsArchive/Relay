import React from 'react'
import { useBasketCount } from '@/app/context/BasketCountContext'
import { ShoppingBasket } from "lucide-react";
import Link from 'next/link';

const BasketButton = () => {
    const { basketCount } = useBasketCount();

  return (
    <Link href="/cart">
    <div className="flex flex-col items-center gap-y-1 relative">
    <div className="navbar-icon-compact">
        <ShoppingBasket
        strokeWidth={1.4}
        className="size-[26px] sm:size-[32px] md:size-[36px]"
        />
    </div>
   
    <div className="text-[12px] sm:text-[14px] md:text-[16px] font-bold absolute bottom-0 right-0">
        {basketCount}
    </div>
    </div>
    </Link>
  )
}

export default BasketButton