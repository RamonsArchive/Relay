import { defineQuery } from 'next-sanity';

/* Products in home page */
export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && defined(slug)] | order(_createdAt desc) {
  _id,
  title,
  image,
  categories,
  materials,
}`);


/*TODO: Fix the cost function  */
export const SEARCH_QUERY = (searchTerm: string | undefined) => {
  if (!searchTerm) return `*[_type == "product"]`; // ✅ Returns all products if searchTerm is empty

  // Handle cost separately to avoid incorrect syntax
  const isNumeric = !isNaN(Number(searchTerm));
  const costFilter = isNumeric ? `cost == ${Number(searchTerm)}` : "";
  console.log(`Cost filter: ${costFilter}`);


  const keywords = searchTerm.split(" ").filter((term) => term.trim() !== "");

  // Construct dynamic conditions for each keyword
  const keywordConditions = keywords
    .map(
      (keyword) => `
        title match "${keyword}*" ||
        "${keyword}" in gender ||
        "${keyword}" in kids ||
        "${keyword}" in size ||
        "${keyword}" in collections[]->name || 
        "${keyword}" in sale ||
        "${keyword}" in colors ||
        "${keyword}" in brand ||
        "${keyword}" in materials ||
        "${keyword}" in categories
      `
    )
    .join(" || ");

  return `*[_type == "product" && defined(slug) ${costFilter ? ` && ${costFilter}` : ""} && (
    ${keywordConditions}
  )] | order(_createdAt desc) {
    _id,
    title,
    image,
    slug,
    gender,
    kids,
    size,
    cost,
    "collections": collections[]->{name},
    sale,
    colors,
    brand,
    materials,
    categories
  }`;
};