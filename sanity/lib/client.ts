import { createClient } from 'next-sanity'
import  imageUrlBuilder  from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'
import { parseServerActionResponse, sanitizeSanityId } from '@/lib/utils'
import { auth } from '@/auth'
import { rateLimiter } from '@/lib/rateLimiter'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const fetchHeartedProducts = async (userId: string | null) => {
  const session = await auth();
  const sessionId = session?.user?.id || "";
  const userIdSanitized = sanitizeSanityId(userId || "");
  if (!userIdSanitized) {
    console.error("Invalid user ID for hearted products");
    return [];
  }

  if (sessionId !== userIdSanitized) {
    console.error("Session ID does not match user ID");
    return [];
  }
  const {success} = await rateLimiter.limit(`${userIdSanitized}:fetchHeartedProducts`);
  if (!success) {
    console.warn("Rate limit exceeded for fetchHeartedProducts");
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
  if (!userId) {
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == "${userId}"][0]{
      "recentlyViewedProducts": recentlyViewedProducts[] {
        _type,
        _ref,
        _key,
      }
    }`;
    const recentlyViewedProducts = await client.fetch(query);
    return recentlyViewedProducts.recentlyViewedProducts || [];
  } catch (error) {
    console.error("Error fetching recently viewed products", error);
    return [];
  }
}

export const fetchPopularCategories = async (userId: string) => {
  const session = await auth();
  const sessionId = session?.user?.id || "";
  const userIdSanitized = sanitizeSanityId(userId);
  if (!userIdSanitized) {
    console.error("Invalid user ID");
    return [];
  }
  if (sessionId !== userIdSanitized) {
    console.error("Session ID does not match user ID");
    return [];
  }
  const {success} = await rateLimiter.limit(`${userIdSanitized}:fetchPopularCategories`);
  if (!success) {
    console.warn("Rate limit exceeded for fetchPopularCategories");
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == $userIdSanitized][0]{
      popularCategories,
    }`;
    const result = await client.withConfig({useCdn: false}).fetch(query, {userIdSanitized});
    const popularCategories = result.popularCategories || [];
    return popularCategories || [];
  } catch (error) {
    console.error("Error fetching popular categories", error);
    return [];
  }
}

export const fetchRecentSearches = async (userId: string) => {
  const session = await auth();
  const sessionId = session?.user?.id || "";
  const sessionIdSanitized = sanitizeSanityId(sessionId);
  const userIdSanitized = sanitizeSanityId(userId);
  if (!userIdSanitized) {
    console.error("Invalid user ID");
    return []; 
  }

  if (sessionIdSanitized !== userIdSanitized) {
    console.error("Session ID does not match user ID");
    return [];
  }
  if (!userId) {
    return [];
  }
  try {

    const {success} = await rateLimiter.limit(`${userIdSanitized}:fetchRecentSearches`);
    if (!success) {
      console.warn("Rate limit exceeded for fetchRecentSearches");
      return [];
    }

    const query = `*[_type == "user" && userId == $userIdSanitized][0]{
      recentSearches
    }`
    const result = await client.withConfig({useCdn: false}).fetch(query, {userIdSanitized});
    return result.recentSearches || [];
  } catch (error) {
    console.error("Error fetching recent searches", error);
    return [];
  }
}

export const verifyNoUserReview = async (productId: string, userId: string) => {
  const session = await auth();
  const sessionId = session?.user?.id || "";
  const userIdSanitized = sanitizeSanityId(userId);
  const productIdSanitized = sanitizeSanityId(productId);

  if (!userIdSanitized || !productIdSanitized) {
    console.error("Invalid user ID or product ID");
    return parseServerActionResponse({
      status: "ERROR",
      error: "Invalid user ID or product ID"
    })
  }

  if (sessionId !== userIdSanitized) {
    console.error("Session ID does not match user ID");
    return parseServerActionResponse({
      status: "ERROR",
      error: "Session ID does not match user ID"
    })
  }

  const {success} = await rateLimiter.limit(`${userIdSanitized}:verifyNoUserReview`);
  if (!success) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Rate limit exceeded"
    })
  }

  try {

    const query = `*[_type == "reviews" && defined(slug) && product._ref == $productIdSanitized && user._ref == $userIdSanitized][0]`
    //const existingReview = await client.fetch(`[_type == "reviews" && defined(slug) && product._ref == "${productId}" && user._ref == "${userId}"][0]`)
    const existingReview = await client.fetch(query, {productIdSanitized, userIdSanitized,}); //, {cache: 'no-store'}

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

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);