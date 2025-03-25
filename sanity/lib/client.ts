import { createClient } from 'next-sanity'
import  imageUrlBuilder  from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'
import { parseServerActionResponse, sanitizeSanityId } from '@/lib/utils'
import { rateLimiter, clientRateLimiter } from '@/lib/rateLimiter'


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

