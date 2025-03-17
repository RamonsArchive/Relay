import { createClient } from 'next-sanity'
import  imageUrlBuilder  from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'
import { parseServerActionResponse } from '@/lib/utils'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const fetchHeartedProducts = async (userId: string | null) => {
  if (!userId) {
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
  if (!userId) {
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == "${userId}"][0]{
      popularCategories,
    }`;
    const result = await client.fetch(query);
    const popularCategories = result.popularCategories || [];
    return popularCategories || [];
  } catch (error) {
    console.error("Error fetching popular categories", error);
    return [];
  }
}

export const fetchRecentSearches = async (userId: string) => {
  console.log("Fetching recent searches for user", userId);
  if (!userId) {
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == "${userId}"][0]{
      recentSearches
    }`
    const result = await client.fetch(query);
    return result.recentSearches || [];
  } catch (error) {

  }
}

export const fetchRecentSearchesSix = async (userId: string) => {
  console.log("Fetching recent searches for user", userId);
  if (!userId) {
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == $userId][0]{
      recentSearches[0...6]
    }`
    const result = await client.withConfig({useCdn: false}).fetch(query, {userId}, { next: { tags: ['recent-searches'] }});
    return result.recentSearches || [];
  } catch (error) {

  }
}

export const verifyNoUserReview = async (productId: string, userId: string) => {
  try {
    console.log("product id", productId);
    console.log("user Id", userId);
     if (!productId) {
      console.error("No productId provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No productId provided"
      })
    }
    if (!userId) {
      console.error("No userId provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No userId provided"
      })
    }

    const query = `*[_type == "reviews" && defined(slug) && product._ref == $productId && user._ref == $userId][0]`
    //const existingReview = await client.fetch(`[_type == "reviews" && defined(slug) && product._ref == "${productId}" && user._ref == "${userId}"][0]`)
    const existingReview = await client.fetch(query, {productId, userId,}); //, {cache: 'no-store'}

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

