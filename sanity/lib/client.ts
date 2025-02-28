import { createClient } from 'next-sanity'
import  imageUrlBuilder  from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const fetchHeartedProducts = async (userId: string | null) => {
  console.log("Fetching hearted products for user", userId);
  if (!userId) {
    return [];
  }
  try {
    const query = `*[_type == "user" && userId == "${userId}"][0].heartedProducts[]._ref`;
    const heartedProducts = await client.fetch(query);
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
    console.log("Recently viewed products", recentlyViewedProducts);
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

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);