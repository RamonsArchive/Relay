"use client";
import { BasketType, ActionState } from '@/globalTypes'
import React, { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './ui/button';   
import { Search, Tag } from 'lucide-react';
import Form from "next/form";
import { convertLineItemsForTax } from '@/lib/utils';
import { applyPromoCodeToCart, estimateTaxForZipCode, initiateCheckout, removePromoCodeFromCart, setShippingMethod, validatePromoCodeForOrder, verifyCart } from '@/sanity/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SummaryDisplay = ({userId, path, cartItems, cartId, temp_cartId}: {userId: string, path: string, cartItems: BasketType[], cartId: number, temp_cartId: string | null}) => {
    const router = useRouter(); 
    const [selectedShipping, setSelectedShipping] = useState("");
    const [zipCode, setZipCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const zipCodeRef = useRef<string>("");  
  
    const shippingOptions = useMemo(() => [
      { id: 'free', name: 'Free (3-7 business days)', price: 0 },
      { id: 'standard', name: 'Standard (3-7 business days)', price: 899 },
      { id: 'express', name: 'Express (2-5 business days)', price: 1299 },
      { id: 'overnight', name: 'Overnight (1-2 business days)', price: 1999 }
    ], []);
  
    const shipping = useMemo(() => {
      return shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0;
    }, [selectedShipping, shippingOptions]);
  
    const subtotal = useMemo(() => {
      if (!cartItems || cartItems.length === 0) return 0;
      return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
    }, [cartItems]);
  
    useEffect(() => {
      setTotal(subtotal - discount + shipping + tax);
    }, [subtotal, discount, shipping, tax]);

    useEffect(() => {
      if (zipCodeRef.current) {
        estimateTax(false, zipCodeRef.current);
      }
    }, [selectedShipping, cartItems]);

    const estimateTax = async (verifyZipCode: boolean = false, zipFromRef?: string) => {
      setIsLoading(true);

      const curr_zipCode = zipCode || zipFromRef || "";
      setZipCode('');
      if (curr_zipCode.length !== 5 && verifyZipCode) {
        toast.error('ERROR', { description: 'Please enter a valid zip code' });
        setIsLoading(false);
        return;
      }
  
      try {
        const taxLineItems = convertLineItemsForTax(cartItems);
        const result = await estimateTaxForZipCode(userId, curr_zipCode, taxLineItems, Math.round(shipping * 100));
  
        if (result.status === 'ERROR') {
          toast.error('ERROR', { description: result.error });
          setIsLoading(false);
          return;
        }
  
        const taxCalculation = result.calculation;
        const estimated_tax = taxCalculation.tax_amount_exclusive / 100;
        setTax(estimated_tax);
        setIsLoading(false);
        if (verifyZipCode) {
          toast.success('SUCCESS', { description: 'Zip code checked successfully' });
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error checking zip code", error);
        toast.error('ERROR', { description: 'Failed to check zip code' });
      }
    };
  

    const handlePromoSubmit = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
      const promoCode = formData.get('promoCode') as string;
      if (!promoCode) {
        toast.error('ERROR', { description: 'Please enter a promo code' });
        return { status: 'ERROR', error: 'Please enter a promo code' };
      }
  
      try {
        const result = await applyPromoCodeToCart(promoCode, cartId, subtotal, userId);
        if (result.status === 'ERROR') {
          toast.error('ERROR', { description: result.error });
          return { status: 'ERROR', error: result.error };
        }
        setDiscount(result.promoCode?.discountAmount || 0);
        setDiscountPercentage(result.promoCode?.discountPercentage || 0);
        toast.success('SUCCESS', { description: 'Promo code applied successfully' });
        return { status: 'SUCCESS', error: '' };
      } catch (error) {
        console.error("Error applying promo code", error);
        return { status: 'ERROR', error: 'Failed to apply promo code' };
      }
    };
  
    const [state, formAction, isPending] = useActionState(handlePromoSubmit, {
      status: 'INITIAL' as const,
      error: ''
    });

    const checkout = async () => {
      try {
        setIsLoading(true);
        if (!userId) {
          const callbackUrl = `${path}/cart`;
          setIsLoading(false);
          router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
          toast.info('Please login to checkout', {
            description: 'You must be logged in to checkout',
          });
          return;
        }
  
        const newPath = `${path}checkout`;
        router.push(newPath);

      } catch (error) {
        setIsLoading(false);
        console.error("Error checking zip code", error);
        toast.error('ERROR', { description: 'Failed to checkout' });
      }
      
    }

    const writeShippingMethod = async (userId: string, shippingMethod: string) => {
      const prevShippingMethod = selectedShipping;
      try {
        setSelectedShipping(shippingMethod);
        setIsLoading(true);
        const result = await setShippingMethod(userId, shippingMethod, temp_cartId);
        if (result.status === 'ERROR') {
          toast.error('ERROR', { description: result.error });
          setIsLoading(false);
          setSelectedShipping(prevShippingMethod);
          return;
        }
        setIsLoading(false);
        toast.success('SUCCESS', { description: 'Shipping method set successfully' });
         
      } catch (error) {
        console.error("Error setting shipping method", error);
        setIsLoading(false);
        setSelectedShipping(prevShippingMethod);
        toast.error('ERROR', { description: 'Failed to set shipping method' });
      }
    }

  return (
    <div className="flex flex-row w-full justify-end w-full mt-5 lg:mt-0 bg-gray-50">
        <div className="flex flex-col w-full h-full p-5 border border-gray-300 border-[1px] rounded-md shadow-md gap-y-5">
          <p className="font-bold text-[22px] xs:text-[24px] md:text-[28px] justify-start">Order Summary</p>
          <div className="flex flex-col w-full gap-y-5">
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Subtotal</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px]">${(subtotal / 100).toFixed(2)}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Discount</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px] text-red-500">-${(discount / 100).toFixed(2)}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Estimated Shipping</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px]">${(shipping / 100).toFixed(2)}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="font-light text-[14px] xs:text-[16px] md:text-[18px]">Estimated Tax</p>
              <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px]">${(tax / 100).toFixed(2)}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
                <p className="font-regular text-[16px] xs:text-[18px] md:text-[20px]">Total</p>
                <p className="font-bold text-[16px] xs:text-[18px] md:text-[20px]">${(total / 100).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="flex border-t w-full border-gray-300 border-[1px] items-center justify-center"></div>
          </div>
          <div className="flex flex-col w-full h-full rounded-md gap-y-3">
            
            <div className="flex flex-row w-full justify-between">
            <p className="font-regular text-[16px] xs:text-[18px] md:text-[20px]">Promo Code {(discountPercentage as number) > 0 && (<span className="text-green-500 font-regular">(${discountPercentage}%)</span>)}</p>
              {(discount > 0) && <p className="font-bold text-[14px] xs:text-[16px] md:text-[18px] text-green-500">${(discount / 100).toFixed(2)}</p>}
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <Form action={formAction} className="flex w-full items-center">
                    <div className="flex flex-row gap-x-2 w-full px-2 py-2 border border-gray-300 border-[1px] rounded-md items-center">
                        <Tag className="w-4 h-4 md:w-5 md:h-5" />
                        <input type="text" placeholder="Add promo code" className="w-full bg-transparent outline-none" name="promoCode" />
                        
                    </div>
                    <Button className="flex items-center justify-center px-2 py-2 h-full" type="submit" disabled={isPending}>Apply</Button>
                </Form>
            </div>
            <div className="flex flex-col w-full gap-y-3">
              <p className="font-regular text-[16px] xs:text-[18px] md:text-[20px]">Shipping</p>
              <div className="flex flex-col w-full gap-y-2">
              {shippingOptions.map((option) => (
                <div key={option.id} className={`flex flex-row w-full justify-between items-center gap-x-3 px-3 py-2 border border-gray-300 border-[1px] rounded-md transition-all duration-300 ease-in-out cursor-pointer ${selectedShipping === option.id ? "bg-blue-200" : ""}`} onClick={() => writeShippingMethod(userId,option.id)}> 
                  <div className={`flex flex-row items-center justify-center w-5 h-5 rounded-full border border-gray-300 transition-all duration-200 ease-in-out ${selectedShipping === option.id ? "bg-blue-100" : ""}`}> 
                  <div className={`object-cover w-full h-full rounded-full transition-all duration-200 ease-in-out ${selectedShipping === option.id ? "bg-[#ffffff]" : "bg-transparent"}`}>
                    </div>
                  </div>
                  <p className="font-light text-[12px] sm:text-[14px] md:text-[16px] flex-1">
                    {option.name}
                  </p>
                  <p className="font-light text-[12px] sm:text-[14px] md:text-[16px]">
                    +${(option.price / 100).toFixed(2)}
                  </p>
                </div>

              ))}
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-3">
            <p className="font-regular text-[16px] xs:text-[18px] md:text-[20px]">Tax Estimation (zip code)</p>
            <form className="flex flex-row w-full gap-y-2 items-center" onSubmit={(e) => {
              e.preventDefault()
              zipCodeRef.current = zipCode;
              estimateTax(true)
              }}>
                <div className="flex flex-row w-full items-center justify-center gap-x-2 px-2 py-2 border border-gray-300 border-[1px] rounded-md">
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                  <input type="text" placeholder="Enter your zip code" className={`w-full bg-transparent outline-none`} value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <Button className="flex items-center justify-center px-2 py-2 h-full" type="submit" disabled={isLoading}>Check</Button>
            </form>
            </div>
            <div className="flex flex-row w-full justify-between border-white bg-primary-200 text-white border border-gray-300 border-[1px] transition-all duration-300 ease-in-out rounded-md hover:opacity-70 mt-3">
              <button className="flex items-center justify-center px-2 py-2 w-full" onClick={checkout} disabled={isLoading}>
                <p className="font-regular text-[16px] xs:text-[18px] md:text-[20px]">Proceed to Checkout</p>
              </button>
            </div>
          </div>
        </div>

      </div>
  )
}

export default SummaryDisplay