import { defineQuery } from 'next-sanity';


/*TODO: Fix the cost function  */
export const SEARCH_QUERY = (searchTerm: string | undefined) => {
  if (!searchTerm) return `*[_type == "product"]`; // ✅ Returns all products if searchTerm is empty

  // Handle cost separately to avoid incorrect syntax
  const isNumeric = !isNaN(Number(searchTerm));
  const costFilter = isNumeric ? `cost == ${Number(searchTerm)}` : "";


  const keywords = searchTerm.split(" ").filter((term) => term.trim() !== "");

  // Construct dynamic conditions for each keyword
  const keywordConditions = keywords
    .map(
      (keyword) => `
        title match "${keyword}*" ||
        "${keyword}" in gender ||
        "${keyword}" in kids ||
        "${keyword}" in size ||
        count(collections[@->title match "${keyword}"]) > 0 ||
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
}`;}


/* KIDS PAGE QUERY */
export const KIDS_PAGE_QUERY = (searchParam: string | undefined) => {
  const filteredParam = searchParam === "/" ? `"boys" in kids || "girls" in kids`  : `"${searchParam}" in kids`;

  return `*[_type == "product" && defined(slug) && (${filteredParam})] {
  _id,
  title,
  image,
  materials,
  categories,
}`;}


/* COLLECTION PAGE QUERY */
export const COLLECTION_PAGE_QUERY = (searchParam: string | undefined) => {
  if (!searchParam) return `*[_type == "product"]`;

  return `*[_type == "product" && defined(slug) && ("${searchParam}" in collections[]->title)] {
  _id,
  title,
  image,
  materials,
  categories,
}`;}


/* FILTER QUERY, GETS CURRENT PARAMS AND ADDS FILTER */

/*export const FILTER_QUERY = (searchParam: string | undefined) = {

}*/