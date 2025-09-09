"use client";
import React from "react";
import { VariantItemType, VariantType } from "@/globalTypes";
import { useEffect } from "react";
import { useProductOptions } from "@/app/context/ProductOptionsContext";

const ProductSizeButtons = ({ variants }: { variants: VariantType }) => {
  const { selectedSize, setSelectedSize, selectedColor } = useProductOptions();

  useEffect(() => {
    if (variantsForColor.length > 0) {
      setSelectedSize(variantsForColor[0].size as string);
    }
  }, [selectedColor, variants]);

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSetSize = (size: string) => {
    setSelectedSize(size);
  };

  const variantsForColor = variants.filter((variant: VariantItemType) => {
    if (!variant.color?.name) return false;
    return variant.color?.name.toLowerCase() === selectedColor.toLowerCase();
  });
 
  return (
    <div className="flex flex-wrap w-full gap-3 pt-2">
      {allSizes.map((size, index) => {
        const variantForSize = variantsForColor.find(
          (variant: VariantItemType) => variant.size === size.toLowerCase()
        );

        const quantity = variantForSize ? variantForSize.quantity : 0;
        return (
          <div
            key={index}
            className={`px-2 py-0.5 font-plex-sans font-regular text-[16px] xs:text-[18px] rounded-md border-[2px] border-gray-300 ${(quantity as number) > 0 ? "cursor-pointer" : "bg-gray-300 text-gray-500 disabled"} ${selectedSize.toLowerCase() === size.toLowerCase() ? "bg-[#FFE8F0] text-pink-700 border-pink-700" : ""}`}
            onClick={() => {
              if ((quantity as number) > 0) {
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

export default ProductSizeButtons;
