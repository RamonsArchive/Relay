"use server";
import { revalidateTag } from "next/cache";
import { signIn, signOut } from '@/auth';
import { parseServerActionResponse, sanitizeSanityId } from '@/lib/utils'
import { rateLimiter, clientRateLimiter } from '@/lib/rateLimiter'
import {client} from '@/sanity/lib/client';

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