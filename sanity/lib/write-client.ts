import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_WRITE_TOKEN,
})
console.log("Write Token from global:", process.env.SANITY_WRITE_TOKEN);

console.log(`Write token in write cleint ${token} `)
if (!writeClient.config().token) {
    throw new Error("Write token not found");
}
