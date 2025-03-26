"use client";
import React from "react";
import { useContext, useEffect } from "react";
import { ColorType, VariantType } from "@/globalTypes";
import { ProductOptionsContext } from "@/app/context/ProductOptionsContext";
import { getUniqeColors } from "@/lib/utils";

const ProductColorButtons = ({ variants }: { variants: VariantType }) => {
  const { selectedColor, setSelectedColor } = useContext(ProductOptionsContext);

  const uniqueColors = getUniqeColors(variants);

  useEffect(() => {
    if (!selectedColor && uniqueColors.length > 0) {
      setSelectedColor(uniqueColors[0].name);
    }
  }, [selectedColor, setSelectedColor, uniqueColors]);

  return (
    <div className="flex flex-row gap-10 w-full mt-3">
      {uniqueColors.map((color: ColorType, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-2 items-center cursor-pointer"
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
