import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { v4 as uuid } from 'uuid';
import React from 'react';
import { CartType, CartItemType } from '@/globalTypes';


const CartPage = async () => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || null;

  const cookieJar = await cookies();
  let temp_cartId = cookieJar.get("temp_cartId")?.value || "";

  // Helper to sync guest cart to user cart
  const syncCart = async (guestId: string, userId: string) => {
    const guestCart = await prisma.cart.findUnique({
      where: { tempCartId: guestId },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) return;

    let userCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!userCart) {
      await prisma.cart.create({
        data: {
          userId,
          items: {
            create: guestCart.items.map(item => ({
              variantId: item.variantId,
              quantity: item.quantity,
            }))
          }
        }
      });
    } else {
      for (const item of guestCart.items) {
        const existingItem = userCart.items.find(i => i.variantId === item.variantId);
        if (existingItem) {
          await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + item.quantity },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cartId: userCart.id,
              variantId: item.variantId,
              quantity: item.quantity,
            },
          });
        }
      }
    }

    await prisma.cart.delete({ where: { tempCartId: guestId } });
    cookieJar.delete("temp_cartId");
  };

  let cart: CartType | null = null;
  if (!userId) {
    if (!temp_cartId) {
      temp_cartId = uuid();
      cookieJar.set("temp_cartId", temp_cartId);
    }
    cart = await prisma.cart.findUnique({
      where: { tempCartId: temp_cartId },
      include: { items: true },
    });

    if (!cart) {
      await prisma.cart.create({
        data: {
          tempCartId: temp_cartId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
      });
    }
  } else {
    if (temp_cartId) {
      await syncCart(temp_cartId, userId);
    }
    cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) {
      await prisma.cart.create({
        data: { userId },
      });
    }
  }

  let cartProducts: CartItemType[] = cart?.items || [];

  return <div>Cart Page with {cart?.items?.length || 0} items</div>;
};

export default CartPage;
