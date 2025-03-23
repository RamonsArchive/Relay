"use client";
import React from "react";
import { ProductStockType } from "@/globalTypes";
import { useContext } from "react";
import { ProductOptionsContext } from "@/app/context/ProductOptionsContext";

const MobileProductSize = ({ stock }: { stock: ProductStockType }) => {
  console.log("Stock", stock);
  const { selectedSize, setSelectedSize } = useContext(ProductOptionsContext);

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSetSize = (size: string) => {
    setSelectedSize(size);
  };
  console.log("seelcted size", selectedSize);
  return (
    <div className="flex flex-wrap w-full gap-3 pt-2">
      {allSizes.map((size, index) => {
        const stockItem = stock.find((s) => s.size === size.toLowerCase());
        const stockQuantity = stockItem?.quantity || 0;
        console.log("StockItem", stockItem);
        console.log("stockQuantity", stockQuantity);
        return (
          <div
            key={index}
            className={`px-2 py-0.5 font-plex-sans font-regular text-[16px] xs:text-[18px] rounded-md border-[2px] border-gray-300 ${stockQuantity > 0 ? "cursor-pointer" : "bg-gray-300 text-gray-500 disabled"}`}
            onClick={() => {
              if (stockQuantity > 0) {
                handleSetSize(size);
              }
            }}
          >
            {size}
          </div>
        );
      })}
    </div>
  );
};

export default MobileProductSize;
