"use client";
import { ProductStockType } from "@/globalTypes";
import React from "react";

const MobileProductBuyButtons = ({ variants }: { variants: any }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 mt-5">
      <button className="w-full px-4 py-3 font-plex-sans font-medium text-[20px] xs:text-[22px] bg-primary-200 rounded-full text-white transition duration-200 ease-in-out hover:opacity-70 active:opacity-70">
        Add to basket
      </button>
      <button className="w-full px-5 py-3 font-plex-sans font-medium text-[20px] xs:text-[22px] bg-secondary-200 rounded-full text-black transition duration-200 ease-in-out hover:opacity-70 active:opacity-70">
        Purchase Now!
      </button>
    </div>
  );
};

export default MobileProductBuyButtons;
