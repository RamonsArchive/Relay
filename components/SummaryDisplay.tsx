"use client";
import { BasketType, ActionState, SummaryStateType } from '@/globalTypes'
import React, { useState, useActionState } from 'react'
import { Button } from './ui/button';   
import { Tag } from 'lucide-react';
import Form from "next/form";
import { parseServerActionResponse } from '@/lib/utils';
import { applyPromoCodeToCart } from '@/sanity/lib/actions';
import { toast } from 'sonner';

const SummaryDisplay = ({cartItems, cartId, userId}: {cartItems: BasketType[], cartId: number, userId: string}) => {
    const [summaryState, setSummaryState] = useState<SummaryStateType>({
        subtotal: cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0),
        discount: 0,
        discountPercentage: 0,
        shipping: 0,
        tax: 0,
        total: 0,
    })

    const {subtotal, discount, shipping, tax, total, discountPercentage} = summaryState;

    const handlePromoSubmit = async (prevState: ActionState, formData: FormData) => {
        try {
            const promoCode = formData.get("promoCode") as string;
            if (!promoCode) {
                toast.error("ERROR", {
                  description: "Please enter a promo code",
                });
                return parseServerActionResponse({
                    status: "ERROR",  
                    error: "Please enter a promo code",
                })
            }
            const result = await applyPromoCodeToCart(promoCode, cartId, subtotal, userId);
            console.log(result);
            if (result.status === "ERROR") {
                toast.error("ERROR", {
                  description: result.error,
                });
                return parseServerActionResponse({
                    status: "ERROR",
                    error: result.error,
                })
            }

            setSummaryState({
                subtotal: cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0),
                discount: result.promoCode?.discountAmount || 0,
                discountPercentage: result.promoCode?.discountPercentage || 0,
                shipping: 0,
                tax: 0,
                total: summaryState.subtotal - (result.promoCode?.discountAmount || 0) + summaryState.shipping + summaryState.tax,
            })

            toast.success("SUCCESS", {
              description: "Promo code applied successfully",
            });

            return parseServerActionResponse({
                status: "SUCCESS",
                error: "",
            })

        } catch (error) {
            console.log(error);
            return parseServerActionResponse({
                status: "ERROR",
                error: "Failed to apply promo code",
            })
        }
       
    }


    const [state, formAction, isPending] = useActionState(handlePromoSubmit, {
        status: "INITIAL",
        error: "",
    })


  return (
    <div className="flex flex-row w-full justify-end w-full mt-5 lg:mt-0">
        <div className="flex flex-col w-full h-full p-5 border border-gray-300 border-[1px] rounded-md shadow-md gap-y-5">
          <p className="font-bold text-[22px] xs:text-[24px] md:text-[28px] justify-start">Order Summary</p>
          <div className="flex flex-col w-full gap-y-5">
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Subtotal</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px]">${subtotal}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Discount</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px] text-red-500">-${discount}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Estimated Shipping</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px]">${shipping}</p>
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="flex border-t w-full border-gray-300 border-[1px] items-center justify-center"></div>
          </div>
          <div className="flex flex-col w-full h-full rounded-md gap-y-5">
            <div className="flex flex-row w-full justify-between">
                <p className="font-regular text-[16px] xs:text-[18px] md:text-[20px]">Total</p>
                <p className="font-bold text-[16px] xs:text-[18px] md:text-[20px]">${total}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
            <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Promo Code {(discountPercentage as number) > 0 && (<span className="text-green-500 font-regular">(${discountPercentage}%)</span>)}</p>
              {(discount > 0) && <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px] text-green-500">${discount}</p>}
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <Form action={formAction} className="flex w-full">
                    <div className="flex flex-row gap-x-2 w-full px-2 py-1 border border-gray-300 border-[1px] rounded-md items-center">
                        <Tag className="w-4 h-4 md:w-5 md:h-5" />
                        <input type="text" placeholder="Add promo code" className="w-full bg-transparent outline-none" name="promoCode" />
                        <Button className="w-fit" type="submit" disabled={isPending}>Apply</Button>
                    </div>
                </Form>

            </div>
            <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Location</p>
          </div>
        </div>

      </div>
  )
}

export default SummaryDisplay