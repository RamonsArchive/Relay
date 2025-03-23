"use client";
import React from "react";
import { ProductStockType, VariantItemType, VariantType } from "@/globalTypes";
import { useContext, useEffect } from "react";
import { ProductOptionsContext } from "@/app/context/ProductOptionsContext";

const ProductSizeButtons = ({ variants }: { variants: VariantType }) => {
  console.log("variants", variants);
  const { selectedSize, setSelectedSize, selectedColor } = useContext(
    ProductOptionsContext
  );

  useEffect(() => {
    if (!selectedSize && variantsForColor.length > 0) {
      setSelectedSize(variantsForColor[0].size as string);
    }
  }, [selectedColor, variants]);

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSetSize = (size: string) => {
    setSelectedSize(size);
  };
  console.log("seelcted size", selectedSize);

  const variantsForColor = variants.filter((variant: VariantItemType) => {
    if (!variant.color?.name) return false;
    return variant.color?.name.toLowerCase() === selectedColor.toLowerCase();
  });
  console.log("variantsForColor", variantsForColor);
  return (
    <div className="flex flex-wrap w-full gap-3 pt-2">
      {allSizes.map((size, index) => {
        const variantForSize = variantsForColor.find(
          (variant: any) => variant.size === size.toLowerCase()
        );

        const quantity = variantForSize ? variantForSize.quantity : 0;
        return (
          <div
            key={index}
            className={`px-2 py-0.5 font-plex-sans font-regular text-[16px] xs:text-[18px] rounded-md border-[2px] border-gray-300 ${(quantity as number) > 0 ? "cursor-pointer" : "bg-gray-300 text-gray-500 disabled"}`}
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
