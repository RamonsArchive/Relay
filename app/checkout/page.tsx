"use client";
import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { validatePromoCodeForOrder, removePromoCodeFromCart, verifyCart, getCartForCheckout, initiateCheckout } from '@/sanity/lib/actions';
import { fetchShippingOptions } from '@/lib/utils';
import { BasketType } from '@/globalTypes';



const page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [cartId, setCartId] = useState<number | null>(null);
    const [subtotal, setSubtotal] = useState<number | null>(null);
    const path = usePathname();


    useEffect(() => {
        const createOrder = async () => {
            try {
                setIsLoading(true);
        
                if (!userId) {
                  console.log("path", path);
                  const callbackUrl = `${path}/cart`;
                  setIsLoading(false);
                  console.log("callbackUrl", callbackUrl);
                  router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
                  toast.info('Please login to checkout', {
                    description: 'You must be logged in to checkout',
                  });
                  return;
                }
                const cart = await getCartForCheckout(userId);
                if (cart.status === 'ERROR') {
                  setIsLoading(false);
                  toast.error('ERROR', { description: cart.error });
                  return;
                }
                
                const shipping_option = await fetchShippingOptions(cart.data?.shippingMethod);
                if (!shipping_option) {
                  setIsLoading(false);
                  toast.error('ERROR', { description: 'Invalid shipping method' });
                  return;
                }


                const subtotal = cart.data.items.reduce((sum: number, item: BasketType) => { return sum + (item.price || 0) * item.quantity}, 0) + (cart.data.promoDiscountAmount || 0) + shipping_option.fixed_amount.amount;
                if (subtotal <= 0) {
                  setIsLoading(false);
                  toast.error('ERROR', { description: 'No items in cart' });
                  return;
                }

                const cartId = cart.data?.cartId;
                if (!cartId) {
                const verifyPromoCode = await validatePromoCodeForOrder(cartId, userId, subtotal);
                  if (verifyPromoCode.status === 'ERROR') {
                    removePromoCodeFromCart(cartId);
                    toast.error('ERROR', { description: verifyPromoCode.error });
                    return;
                }
          
                
                const veriyCart = await verifyCart(userId, cartId);
          
                if (veriyCart.status === 'ERROR') {
                  toast.error('ERROR', { description: veriyCart.error });
                  return;
                }
                toast.success('SUCCESS', { description: 'Cart verified successfully' });
          
                const initiateCheckoutResult = await initiateCheckout(userId);
                if (initiateCheckoutResult.status === 'ERROR') {
                  toast.error('ERROR', { description: initiateCheckoutResult.error });
                  setIsLoading(false);
                  router.push(initiateCheckoutResult.cancelUrl);
                  return;
                }
                toast.success('SUCCESS', { description: 'Checkout initiated successfully' });
                router.push(initiateCheckoutResult.successUrl);
                setIsLoading(false);
            }
              } catch (error) {
                setIsLoading(false);
                console.log(error);
                toast.error('ERROR', { description: 'Failed to checkout' });
              }
        

        createOrder();
            }
    }, [])
    


  return (
    <div>page</div>
  )
}

export default page