"use client";
import React from "react";
import { useEffect } from "react";
import { ColorType, VariantType } from "@/globalTypes";
import { useProductOptions } from "@/app/context/ProductOptionsContext";
import { getUniqeColors } from "@/lib/utils";

const ProductColorButtons = ({ variants }: { variants: VariantType }) => {
  const { selectedColor, setSelectedColor} = useProductOptions();

  const uniqueColors = getUniqeColors(variants);

  useEffect(() => {
    if (!selectedColor && uniqueColors.length > 0) {
      setSelectedColor(uniqueColors[0].name as string);
    }
  }, [selectedColor, setSelectedColor, uniqueColors]);

  return (
    <div className="flex flex-row gap-8 w-full mt-3 overflow-x-auto scrollbar-hidden pr-3">
      {uniqueColors.map((color: ColorType) => (
        <div
          key={color.name}
          className={`flex flex-col gap-1 items-center cursor-pointer px-2 py-2 rounded-full transition-all duration-300 ease-in-out ${selectedColor === color?.name ? "bg-gray-300" : ""}`}
          onClick={() => setSelectedColor(color?.name as string)}
        >
          <div
            className={`p-4 rounded-full`}
            style={{ backgroundColor: color?.hexCode || "#fff" }}
          ></div>

          <p className="font-plex-sans text-[14px] xs:text-[16px]">
            {color.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductColorButtons;
