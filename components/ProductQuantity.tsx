"use client";
import { ProductOptionsContext } from "@/app/context/ProductOptionsContext";
import { VariantItemType, VariantType } from "@/globalTypes";
import React from "react";
import { useContext, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const ProductQuantity = ({ variants }: { variants: VariantType }) => {
  const { selectedColor, selectedSize, quantity, setQuantity } = useContext(
    ProductOptionsContext
  );

  /* Refresh on every change*/
  useEffect(() => {
    if (quantity != 1) {
      setQuantity(1);
    }
  }, [selectedColor, selectedSize]);

  const variantForColorSize = variants.find(
    (variant: VariantItemType) =>
      variant?.color?.name?.toLowerCase() == selectedColor.toLowerCase() &&
      variant?.size?.toLowerCase() === selectedSize.toLowerCase()
  );

  console.log("variantForColorSize", variantForColorSize);

  const totalQuantity = variantForColorSize?.quantity || 1;
  console.log("Total quantity", totalQuantity);

  const handleSetQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <div className="flex flex-row items-center justify-center md:justify-start ">
      <div className="flex items-center justify-between border-[1px] border-gray-500 rounded-sm w-full max-w-sm gap-3 h-[50px] sm:h-[60px]">
        <button
          className={`flex w-full h-full items-center justify-center transition duration-200 ease-in-out ${quantity === 1 ? " bg-gray-300 pointer-events-none" : "cursor-pointer active:bg-gray-100"}`}
          onClick={() => handleSetQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          <Minus className="size-[18px] sm:size-[20px] md:size-[22px]" />
        </button>
        <div className="text-center font-plex-sans font-semibold text-[20px] xs:text-[22px]">
          <span>{quantity}</span>
        </div>
        <button
          className={`flex w-full h-full items-center justify-center transition duration-200 ease-in-out ${quantity === totalQuantity ? "bg-gray-300 pointer-events-none" : "cursor-pointer active:bg-gray-100"}`}
          onClick={() => handleSetQuantity(quantity + 1)}
          disabled={quantity === totalQuantity}
        >
          <Plus className="size-[18px] sm:size-[20px] md:size-[22px]" />
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
