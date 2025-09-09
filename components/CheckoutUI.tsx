"use client";
import React from 'react'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { validatePromoCodeForOrder, removePromoCodeFromCart, verifyCart, getCartForCheckout, initiateCheckout } from '@/sanity/lib/actions';
import { CartItemForCheckoutType } from '@/globalTypes';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST || "");

if (!stripePromise) {
    throw new Error("Stripe promise not found");
  }

const CheckoutUI = ({userId, path}: {userId: string, path: string }) => {

    const router = useRouter();
    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
    const [noCart, setNoCart] = useState(false);

    useEffect(() => {
        const createOrder = async () => {
            try { 
                if (!userId) {
                  const callbackUrl = `${path}/cart`;
                  toast.info('Please login to checkout', {
                    description: 'You must be logged in to checkout',
                  });
                  router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
                  return;
                }
                const cart = await getCartForCheckout(userId);
                if (cart.status === 'ERROR') {
                  toast.error('ERROR', { description: cart.error });
                  if (cart.error === 'No cart found') {
                    setNoCart(true);
                  }
                  return;
                }
              
                const subtotal = cart.data.items.reduce((sum: number, item: CartItemForCheckoutType) => { 
                  return sum + (item.variant.product.price || 0) * item.quantity
                }, 0);
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
            } catch (error) {
                console.error("Error creating order", error);
                toast.error('ERROR', { description: 'Failed to checkout' });
              }
        }
        createOrder();
    }, [])    

    return (
      <div className="min-h-screen w-full bg-white overflow-y-auto scrollbar-hide">
        {stripeClientSecret ? (
          <div className="h-full w-full overflow-y-auto scrollbar-hide">
            <EmbeddedCheckoutProvider 
              stripe={stripePromise} 
              options={{
                clientSecret: stripeClientSecret,
                // Optional: customize the appearance
              }}
            >
              <div className="h-full w-full overflow-y-auto scrollbar-hide">
                <EmbeddedCheckout />
              </div>
            </EmbeddedCheckoutProvider>
            
            {/* Custom CSS to ensure full height */}
            <style jsx global>{`
              #checkout {
                min-height: 100vh !important;
                width: 100% !important;
              }
              
              /* Target Stripe's iframe container */
              .EmbeddedCheckout {
                min-height: 100vh !important;
                width: 100% !important;
              }
              
              /* Target the Stripe iframe itself */
              iframe[src*="js.stripe.com"] {
                min-height: 100vh !important;
                width: 100% !important;
                border: none !important;
              }
              
              /* Ensure parent containers don't add padding/margin */
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
              }
            `}</style>
          </div>
        ) : (
          noCart ? (
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-2 bg-white px-4">
              <h1 className="text-2xl font-bold">No cart found</h1>
              <p className="text-sm text-gray-500">Please add items to your cart to checkout</p>
              <Link href="/">
                <button className="flex items-center text-[12px] xs:text-[14px] sm:text-[16px] justify-center font-regular px-2 py-1 transition duration-300 ease-in-out hover:bg-gray-50 border border-gray-300 rounded-md">
                  Home
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
              <h1 className="text-2xl font-bold">Loading...</h1>
              <p className="text-sm text-gray-500">Please wait while we process your checkout...</p>
            </div>
          )
        )}
      </div>
    );
}

export default CheckoutUI