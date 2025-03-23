"use client";
import { ProductOptionsContext } from "@/app/context/ProductOptionsContext";
import { VariantType } from "@/globalTypes";
import React from "react";
import { useContext, useEffect } from "react";

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
    (variant) =>
      variant?.color?.name == selectedColor && variant?.size === selectedSize
  );

  const totalQuantity = variantForColorSize?.quantity || 1;

  const handleSetQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      <button
        className={`p-2 xs:p-3 bg-gray-400 rounded-full transition duration-200 ease-in-out text-white ${quantity === 1 ? " bg-gray-500 pointer-events-none" : "cursor-pointer active:bg-gray-300"}`}
        onClick={() => handleSetQuantity(quantity - 1)}
        disabled={quantity === 1}
      >
        Minus
      </button>
      <div className="font-plex-sans font-semibold text-[20px] xs:text-[22px]">
        <span>Quantity: {quantity}</span>
      </div>
      <button
        className={`p-2 xs:p-3 bg-gray-400 rounded-full transition duration-200 ease-in-out text-white ${quantity === totalQuantity ? "bg-gray-500 pointer-events-none" : "cursor-pointer active:bg-gray-300"}`}
        onClick={() => handleSetQuantity(quantity + 1)}
        disabled={quantity === totalQuantity}
      >
        Plus
      </button>
    </div>
  );
};

export default ProductQuantity;
