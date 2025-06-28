"use client";
import { updateDataBaseQuantities } from '@/sanity/lib/actions';
import { Plus, Minus } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner';

const BasketQuantitySelector = ({userId, variantId, productId, quantity, stockQuantity, temp_cartId}: {userId: string, variantId: string, productId: string | null, quantity: number, stockQuantity: number, temp_cartId: string | null}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSetQuantity = async (change: number) => {
        // capture the prev quantity here
        const prevQuantity = currentQuantity;
        const newQuantity = currentQuantity + change;

        if (newQuantity > stockQuantity) {
            toast.error("ERROR", {
                description: `Selected ${quantity} items, but only ${stockQuantity} left in stock`
            });
            return;
        } 
        if (newQuantity < 1) {
            toast.error("ERROR", {
                description: "You cannot remove more than the quantity in your cart"
            });
            return;
        } 
        setCurrentQuantity((prev) => prev + change);
        setIsUpdating(true);
       
        try {
            const result = await updateDataBaseQuantities(userId, variantId, productId as string, newQuantity, temp_cartId);
            if (result.status === "ERROR") {
                toast.error("ERROR", {
                    description: result.error
                });
                setCurrentQuantity(prevQuantity);
                return;
            }

            toast.success("SUCCESS", {
                description: "Quantity updated successfully"
            });

        } catch (error) {
            console.error("Error updating data base quantities", error);
            toast.error("ERROR", {
                description: "Failed to update quantity"
            });
            setCurrentQuantity(prevQuantity);
            return;
        } finally {
            setIsUpdating(false);
        }
    }


  return (
    <div className="flex flex-row items-center justify-start max-w-md">
        <div className="flex items-center justify-between border-[1px] border-gray-500 rounded-sm w-full max-w-sm gap-3 sm:gap-4 md:gap-5 h-[25px] sm:h-[35px]">
            <button className={`flex w-full h-full items-center justify-center transition duration-200 ease-in-out cursor-pointer active:bg-gray-100 hover:bg-gray-200 px-2 ${currentQuantity === 1 || isUpdating ? "bg-gray-300 pointer-events-none" : ""}`} onClick={() => handleSetQuantity(-1)}>
                <Minus className="size-[16px] sm:size-[20px] md:size-[22px]" />
            </button>
            <div className="text-center font-plex-sans font-semibold text-[16px] xs:text-[18px]">
                <span>{currentQuantity}</span>
            </div>
            <button className={`flex  w-full h-full items-center justify-center transition duration-200 ease-in-out cursor-pointer active:bg-gray-100 hover:bg-gray-200 px-2 ${currentQuantity === stockQuantity || isUpdating ? "bg-gray-300 pointer-events-none" : ""}`} onClick={() => handleSetQuantity(1)}>
                <Plus className="size-[16px] sm:size-[18px] md:size-[20px]" />
            </button>
        </div>

    </div>
  )
}

export default BasketQuantitySelector