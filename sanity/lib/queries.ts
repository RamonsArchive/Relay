import { defineQuery } from 'next-sanity';


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
        "${keyword}" in collections[]->title || 
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
    "collections": collections[]->{title},
    sale,
    colors,
    brand,
    materials,
    categories
  }`;
};


/* GENDER PAGE QUERY */
export const GENDER_PAGE_QUERY = (searchParam: string | undefined) => {
  const filteredParam = searchParam === "unisex" ? `"unisex" in gender` : `"${searchParam}" in gender || "unisex" in gender`;

  return `*[_type == "product" && defined(slug) && (${filteredParam})] {
  _id,
  title,
  image,
  materials,
  categories,
  gender,
}`;}


/* KIDS PAGE QUERY */
export const KIDS_PAGE_QUERY = (searchParam: string | undefined) => {
  console.log(`Search param: ${searchParam}`);
  const filteredParam = searchParam === "/" ? `"boys" in kids || "girls" in kids`  : `"${searchParam}" in kids`;
  console.log(filteredParam);

  return `*[_type == "product" && defined(slug) && (${filteredParam})] {
  _id,
  title,
  image,
  materials,
  categories,
}`;}


/* COLLECTION PAGE QUERY */
export const COLLECTION_PAGE_QUERY = (searchParam: string | undefined) => {
  console.log(`Search param: ${searchParam}`);

  return `*[_type == "product" && defined(slug) && (${searchParam} in collections[]->title)] {
  _id,
  title,
  image,
  materials,
  categories,
  "collectionTitle": collections[]->title
}`;}