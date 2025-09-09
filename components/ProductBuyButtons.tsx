"use client";
// import { VariantType } from "@/globalTypes";
import React from "react";
import { useProductOptions } from "@/app/context/ProductOptionsContext";
import { addToBasket } from "@/sanity/lib/actions";
import { toast } from "sonner";
import { useBasketCount } from "@/app/context/BasketCountContext";


const ProductBuyButtons = ({ userId, productId, temp_cartId }: { userId: string | null, productId: string, temp_cartId: string | null }) => {
  const { refreshBasketCount } = useBasketCount();
  const { selectedColor, selectedSize, quantity } = useProductOptions();

  const handleAddToBasket = async() => {
    try {
      const response = await addToBasket(userId || "", productId, selectedColor, selectedSize, quantity, temp_cartId || "");
      if (response.status === "SUCCESS") {
        toast.success("SUCCESS", {
          description: "Item successfully added to basket",
        });
        refreshBasketCount(1);

      } else {
        toast.error("ERROR", {
          description: response.error,
        });
      }
    } catch (error) {
      console.error("Error adding item to basket", error);
      toast.error("ERROR", {
        description: "Failed to add item to basket",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center md:justify-start gap-3 px-4 md:px-0 md:pr-4 mt-5 max-w-sm">
      <button className="w-full px-4 py-3 font-plex-sans font-semibold text-[20px] xs:text-[22px] bg-primary-200 rounded-full text-white transition duration-200 ease-in-out md:hover:scale-105 active:opacity-70" onClick={handleAddToBasket}>
        Add to basket
      </button>
      <button className="w-full px-5 py-3 font-plex-sans font-semibold text-[20px] xs:text-[22px] bg-secondary-200 rounded-full text-black transition duration-200 ease-in-out md:hover:scale-105 active:opacity-70">
        Purchase Now!
      </button>
    </div>
  );
};

export default ProductBuyButtons;
