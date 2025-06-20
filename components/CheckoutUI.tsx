"use client";
import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { validatePromoCodeForOrder, removePromoCodeFromCart, verifyCart, getCartForCheckout, initiateCheckout } from '@/sanity/lib/actions';
import { fetchShippingOptions } from '@/lib/utils';
import { BasketType } from '@/globalTypes';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST || "");
//console.log("stripePromise", stripePromise);

if (!stripePromise) {
    throw new Error("Stripe promise not found");
  }

const CheckoutUI = ({userId, path}: {userId: string, path: string }) => {

    const router = useRouter();
    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                console.log("userId", userId);
                console.log("path", path);
        
                if (!userId) {
                  console.log("path", path);
                  const callbackUrl = `${path}/cart`;
                  console.log("callbackUrl", callbackUrl);
                  toast.info('Please login to checkout', {
                    description: 'You must be logged in to checkout',
                  });
                  router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
                  return;
                }
                const cart = await getCartForCheckout(userId);
                console.log("cart", cart);
                if (cart.status === 'ERROR') {
                  toast.error('ERROR', { description: cart.error });
                  return;
                }
                console.log("passed cart check");
                
                const temp_shipping_method = cart.data.shippingMethod;
                console.log("temp_shipping_method", temp_shipping_method);
                console.log("cart.data.shippingMethod: ", cart.data.shippingMethod);

                const shipping_options = await fetchShippingOptions(cart.data.shippingMethod);
                console.log("shipping_options", shipping_options);
                if (shipping_options.status === 'ERROR') {
                  toast.error('ERROR', { description: 'Invalid shipping method' });
                  return;
                }
                const shipping_option = shipping_options.data;
                const subtotal = cart.data.items.reduce((sum: number, item: BasketType) => { return sum + (item.price || 0) * item.quantity}, 0) + (cart.data.promoDiscountAmount || 0) + shipping_option.fixed_amount.amount;
                if (subtotal <= 0) {
                  toast.error('ERROR', { description: 'No items in cart' });
                  return;
                }
                const cartId = cart.data?.cartId;
                if (!cartId) {
                    throw new Error('Cart ID not found');
                }

                const verifyPromoCode = await validatePromoCodeForOrder(cartId, userId, subtotal);
                if (verifyPromoCode.status === 'ERROR') {
                    removePromoCodeFromCart(cartId);
                    toast.error('ERROR', { description: verifyPromoCode.error });
                    throw new Error('Failed to validate promo code');
                }
                
                const verifyCartResult = await verifyCart(userId, cartId);
                if (verifyCartResult.status === 'ERROR') {
                  toast.error('ERROR', { description: verifyCartResult.error });
                  throw new Error('Failed to verify cart');
                }
                toast.success('SUCCESS', { description: 'Cart verified successfully' });
          
                const initiateCheckoutResult = await initiateCheckout(userId);
                if (initiateCheckoutResult.status === 'ERROR') {
                  console.error("initiateCheckoutResult.error", initiateCheckoutResult.error);
                  toast.error('ERROR', { description: initiateCheckoutResult.error });
                  throw new Error('Failed to initiate checkout');
                }

                if (!initiateCheckoutResult.clientSecret) {
                  throw new Error('Client secret not found');
                }
                const clientSecret = initiateCheckoutResult.clientSecret;
                setStripeClientSecret(clientSecret);
                toast.success('SUCCESS', { description: 'Checkout initiated successfully' });
            
            } catch (error) {
                console.log(error);
                toast.error('ERROR', { description: 'Failed to checkout' });
              }
        }
        createOrder();
    }, [])    

  return (
    <div id="checkout">
        {stripeClientSecret ? (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret: stripeClientSecret}}>
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        ) : (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Loading...</h1>
                <p className="text-sm text-gray-500">Please wait while we process your checkout...</p>
            </div>
        )}
    </div>
  )
}

export default CheckoutUI