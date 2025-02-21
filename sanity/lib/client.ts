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

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);