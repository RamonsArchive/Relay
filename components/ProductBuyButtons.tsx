"use client";
import { VariantType } from "@/globalTypes";
import React from "react";
import { useProductOptions } from "@/app/context/ProductOptionsContext";
const ProductBuyButtons = ({ userId, productId, }: { userId: string | null, productId: string }) => {

  const { selectedColor, selectedSize, quantity } = useProductOptions();

  return (
    <div className="flex flex-col items-center justify-center md:justify-start gap-3 px-4 md:px-0 md:pr-4 mt-5 max-w-sm">
      <button className="w-full px-4 py-3 font-plex-sans font-semibold text-[20px] xs:text-[22px] bg-primary-200 rounded-full text-white transition duration-200 ease-in-out md:hover:scale-105 active:opacity-70">
        Add to basket
      </button>
      <button className="w-full px-5 py-3 font-plex-sans font-semibold text-[20px] xs:text-[22px] bg-secondary-200 rounded-full text-black transition duration-200 ease-in-out md:hover:scale-105 active:opacity-70">
        Purchase Now!
      </button>
    </div>
  );
};

export default ProductBuyButtons;
