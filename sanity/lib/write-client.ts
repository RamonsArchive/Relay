
import { createClient } from 'next-sanity'
import  imageUrlBuilder  from '@sanity/image-url'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
})

console.log(`Write token in write cleint ${token} `)
if (!writeClient.config().token) {
    throw new Error("Write token not found");
}

const builder = imageUrlBuilder(writeClient);
export const urlFor = (source: any) => builder.image(source);