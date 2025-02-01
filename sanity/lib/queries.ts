import { defineQuery } from 'next-sanity';

/* Products in home page */
export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && defined(slug)] | order(_createdAt desc) {
  _id,
  title,
  image,
  categories,
  materials,
}`);