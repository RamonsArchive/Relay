"use client"
import { Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';
import { deleteBasketItem } from '@/sanity/lib/actions';
import { BasketCountContext } from '@/app/context/BasketCountContext';
import { useContext } from 'react';

const BasketItemTrash = ({userId, variantId, cartId}: {userId: string, variantId: string, cartId: number}) => {
    const {refreshBasketCount} = useContext(BasketCountContext);
    const handleDelete = async () => {
        try {
            const result = await deleteBasketItem(userId, variantId, cartId);
            if (result.status === "ERROR") {
                toast.error("ERROR", {
                    description: result.error
                });
                return;
            }
            refreshBasketCount(-1);
            toast.success("SUCCESS", {
                description: "Item deleted from cart"
            });
            return;
        } catch (error) {
            console.error("Error deleting item from cart", error);
            toast.error("ERROR", {
                description: "Failed to delete item from cart"
            })
        }
    }

  return (
    <div className="flex items-center justify-center px-2 py-1 rounded-md h-full transform transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white" onClick={handleDelete}>
        <Trash2 className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"/>
    </div>
  )
}

export default BasketItemTrash