"use server";
import { revalidateTag } from "next/cache";
import { signIn, signOut } from '@/auth';
import { parseServerActionResponse, sanitizeSanityId } from '@/lib/utils'
import { rateLimiter, clientRateLimiter } from '@/lib/rateLimiter'
import {client} from '@/sanity/lib/client';
import { prisma } from "@/lib/prisma";
import { v4 as uuid } from 'uuid';
import { CartType, BasketType } from '@/globalTypes';

export const handleSignIn = async (callbackUrl: string) => {
    return await signIn("google", {redirectTo: callbackUrl});
}

export const handleSignOut = async () => {
    return await signOut({redirectTo: "/"});
}

export const revalidateFlaggedReviews = async () => {
  console.log("Revalidating flagged reviews.........................");
  revalidateTag("flagged-reviews");
};

export const revalidateHeartedProducts = async () => {
  console.log("Revalidating hearted products.........................");
  revalidateTag("hearted-products");
}

export const revalidateRecentSearches = async () => {
  console.log("Revalidating recently searched.........................");
  revalidateTag("recent-searches");
}

export const fetchHeartedProducts = async (userId: string | null) => {
  const userIdSanitized = sanitizeSanityId(userId || "");
  if (!userIdSanitized) {
    console.warn("No userId provided");
    return [];
  }

  const {success} = await clientRateLimiter.limit(`${userIdSanitized}:fetchHeartedProducts`);
  if (!success) {
    console.warn("Rate limit exceeded. Please try again later");
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == $userId][0].heartedProducts[]._ref`;
    const heartedProducts = await client.withConfig({useCdn: false}).fetch(query, {userId}, { next: { tags: ['hearted-products'] } });
    return heartedProducts || [];
  } catch (error) {
    console.error("Error fetching hearted products", error);
    return [];
  }
}

export const fetchRecentyViewedProducts = async (userId: string) => {
  const userIdSanitized = sanitizeSanityId(userId);

  if (!userIdSanitized) {
    console.warn("No userId provided");
    return [];
  }

  const {success} = await rateLimiter.limit(`${userIdSanitized}:fetchRecentlyViewedProducts`);
  if (!success) {
    console.warn("Rate limit exceeded. Please try again later");
    return [];
  }

  try {
    const query = `*[_type == "user" && userId == $userIdSanitized][0]{
      "recentlyViewedProducts": recentlyViewedProducts[] {
        _type,
        _ref,
        _key,
      }
    }`;
    const recentlyViewedProducts = await client.fetch(query, {userIdSanitized});
    return recentlyViewedProducts.recentlyViewedProducts || [];
  } catch (error) {
    console.error("Error fetching recently viewed products", error);
    return [];
  }
}

export const fetchPopularCategories = async (userId: string) => {
  const userIdSanitized = sanitizeSanityId(userId);
  if (!userIdSanitized) {
    console.warn("No userId provided");
    return [];
  }

  const {success} = await rateLimiter.limit(`${userIdSanitized}:fetchPopularCategories`);
  if (!success) {
    console.warn("Rate limit exceeded. Please try again later");
    return [];
  }

  try {
    const query = `*[_type == "user" && userId == $userIdSanitized][0]{
      popularCategories,
    }`;
    const result = await client.fetch(query, {userIdSanitized});
    const popularCategories = result.popularCategories || [];
    return popularCategories || [];
  } catch (error) {
    console.error("Error fetching popular categories", error);
    return [];
  }
}

export const fetchRecentSearches = async (userId: string) => {
  const userIdSanitized = sanitizeSanityId(userId);
  if (!userIdSanitized) {
    console.warn("No userId provided");
    return [];
  }
  const {success} = await rateLimiter.limit(`${userIdSanitized}:fetchRecentSearches`);
  if (!success) {
    console.warn("Rate limit exceeded. Please try again later");
    return [];
  }

  try {
    const query = `*[_type == "user" && userId == $userIdSanitized][0]{
      recentSearches
    }`
    const result = await client.fetch(query, {userIdSanitized});
    return result.recentSearches || [];
  } catch (error) {
    console.error("Error fetching recent searches", error);
  }
}

export const fetchRecentSearchesFew = async (userId: string) => {
  const userIdSanitized = sanitizeSanityId(userId);

  if (!userIdSanitized) {
    console.warn("No userId provided");
    return [];
  }

  const {success} = await clientRateLimiter.limit(`${userIdSanitized}:fetchRecentSearchesFew`);
  if (!success) {
    console.warn("Rate limit exceeded. Please try again later");
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == $userIdSanitized][0]{
      recentSearches[0...8]
    }`
    const result = await client.withConfig({useCdn: false}).fetch(query, {userIdSanitized}, { next: { tags: ["recent-searches"] }});
    return result.recentSearches || [];
  } catch (error) {
    console.error("Error fetching recent searches", error);
  }
}

export const verifyNoUserReview = async (productId: string, userId: string) => {
  
  const userIdSanitized = sanitizeSanityId(userId);
  const productIdSanitized = sanitizeSanityId(productId);

  const {success} = await clientRateLimiter.limit(`${userIdSanitized}:verifyNoUserReview`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Rate limit exceeded. Please try again later"
      })
    }
  
  try {
     if (!productIdSanitized) {
      console.error("No productId provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No productId provided"
      })
    }
    if (!userIdSanitized) {
      console.error("No userId provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No userId provided"
      })
    }

    const query = `*[_type == "reviews" && defined(slug) && product._ref == $productIdSanitized && user._ref == $userIdSanitized][0]`
    const existingReview = await client.fetch(query, {productIdSanitized, userIdSanitized,}); 

    console.log("Existing user in client", existingReview);

    if (existingReview) {
      console.error("User has already written a review for this product.")
      return parseServerActionResponse({
        ...existingReview,
        status: "ERROR",
        error: "You have already written a review for this product.",
      });
    }

    return parseServerActionResponse({
      ...existingReview,
      status: "SUCCESS",
      error: "",
    })

  } catch (error) {
    return parseServerActionResponse({
      status: "ERROR",
      error: error
    })
  }
}


export const getCart = async (userId: string, temp_cartId: string, cookieJar: any) => {
  const userIdSanitized = sanitizeSanityId(userId);
  const temp_cartIdSanitized = sanitizeSanityId(temp_cartId);

  try {

  if (!userIdSanitized && !temp_cartIdSanitized) {
    console.warn("No userId or temp_cartId provided");
    return [];
  }

  const {success} = await clientRateLimiter.limit(`${userIdSanitized}:getCartData`);
  if (!success) {
    console.warn("Rate limit exceeded. Please try again later");
    return [];
  }


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
      await syncCart(temp_cartId, userId, cookieJar);
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

  const cartInfo = await getCartInfo(cart);
  return cartInfo;

  } catch (error) {
    console.error("Failed to get cart", error)
    return [];
  }
}

const syncCart = async (guestId: string, userId: string, cookieJar: any) => {
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





const getCartInfo = async (cart: CartType | null) => {
  if (!cart) {
    console.warn("No cart provided");
    return [];
  }

  const cartItems = cart.items;
  const basket: BasketType[] = []

  try {
    for (const item of cartItems) {
      const variant = await prisma.variant.findUnique({
        where: { id: item.variantId },
        select: {
          id: true,
          size: true,
          color: true,
          stockQuantity: true,
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              images: true,
            }
          }
        }
      })
      if (!variant) {
        console.warn("No variant found");
        continue;
      }
      const inBasket = {
        id: variant.id,
        productId: variant.product.id,
        title: variant.product.title,
        color: variant.color,
        size: variant.size,
        imageUrl: variant.product.images,
        price: variant.product.price,
        quantity: item.quantity,
        lineSubtotal: (variant.product.price || 0) * item.quantity,
        stockQuantity: variant.stockQuantity,
        images: variant.product.images
      }
      basket.push(inBasket);
    }
    return basket;
    
  } catch (error) {
    console.error("Error getting cart info", error);
    return [];
  }

}