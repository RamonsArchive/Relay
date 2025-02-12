import { defineQuery } from 'next-sanity';


/*TODO: Fix the cost function  */
export const PAGE_QUERY = (path: string, query: string, filters: string) => {
  const pageType = path.split("/")[0]; // first part of the path
  const pageEnd = path.split("/").pop(); // last part of the path

  console.log(`Page Type: ${pageType}`);
  console.log(`Page End: ${pageEnd}`);

  const filtersArray = filters ? filters?.split(",") : [];
  const queryArray = query ? query?.split(" ").filter((term) => term.trim() !== "") : [];

  const searchTerm = [...new Set([...filtersArray, ...queryArray])].join(" ");
  
  if (path === "/") {
    if (searchTerm == "") {
      return `*[_type == "product"] {
        _id,
        title,
        mainImage,
        materials,
        categories,
        "collections": collections[]->{
          _id,
          _key,
          title,
        }
      }`; 
    } else if (filters == "") {
      return constructQuerySearch(searchTerm);
    } else if (query == "") {
      return constructHomePageFilters(searchTerm);
    } else {
      return constructQueryPlusFilters(queryArray, filtersArray);
    } 
  } 
    
    let genderConditions = "";
    let kidsConditions = "";
    let filteredCollectionsPath = "";
    if (pageEnd == "newarrivals" || pageEnd == "bestsellers"){
      filteredCollectionsPath = pageEnd == "newarrivals" ? "new arrivals" : "best sellers";
    } else if (pageEnd == "men" || pageEnd == "women" || pageEnd == "unisex") {
      genderConditions = pageEnd == "unisex" ? `"unisex" in gender` : `"${pageEnd}" in gender || "unisex" in gender`;
    } else if (pageEnd == "kids" || pageEnd == "boys" || pageEnd == "girls") {
      kidsConditions = pageEnd == "kids" ? `"boys" in kids || "girls" in kids` : pageEnd == "boys" ? `"boys" in kids` : `"girls" in kids`;
    }

    const paramConditions = [
      filteredCollectionsPath ? `count(collections[@->title match "${filteredCollectionsPath}"]) > 0` : `count(collections[@->title match "${pageEnd}"]) > 0`,
      genderConditions,
      kidsConditions,
    ].filter(Boolean).join(" || ");

   if (!searchTerm) {
    return constructNonHomePage(paramConditions);
   }

   return constructNonHomePagePlusFilters(paramConditions, searchTerm);
  
};


export const PRODUCT_ID_QUERY = (id: string) => {
  return `*[_type == "product" && _id == "${id}"] {

  }`
}

/* For query searches only */
const constructQuerySearch = (searchTerm: string) => {
  console.log("THERE WAS A SEARCH TERM");
  const isNumeric = !isNaN(Number(searchTerm));
  const costFilter = isNumeric ? `cost == ${Number(searchTerm)}` : "";

  const keywords = searchTerm?.split(" ").filter((term) => term.trim() !== "");

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
    ${keywordConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    materials,
    categories,
    "collections": collections[]->{
      _id,
      _key,
      title,
    }
  }`;
}

/* For homepage with filters */
const constructHomePageFilters = (searchTerm: string) => {
  // home and filters only
  console.log("THERE WAS NO SEARCH TERM BUT FILTERS");
  const keywords = searchTerm?.split(" ").filter((term) => term.trim() !== "");
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
    ).join(" && ");

  return `*[_type == "product" && defined(slug) && (${keywordConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    materials,
    categories,
    "collections": collections[]->{
      _id,
      _key,
      title,
    }
  }`
}

const constructQueryPlusFilters = (queryArray: string[], filtersArray: string[]) => {
  const  keywordConditions = queryArray.map((keyword) => `
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
  `).join(" || ");

  const filterConditions = filtersArray.map((filter) => `
    title match "${filter}*" ||
    "${filter}" in gender ||
      "${filter}" in kids ||
      "${filter}" in size ||
      count(collections[@->title match "${filter}"]) > 0 ||
      "${filter}" in sale ||
      "${filter}" in colors ||
      "${filter}" in brand ||
      "${filter}" in materials ||
      "${filter}" in categories
  `).join(" && ");

  return `*[_type == "product" && defined(slug) && (${keywordConditions}) && (${filterConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    materials,
    categories,
    "collections": collections[]->{
      _id,
      _key,
      title,
  }
  }`
}

/* For non home pages only */
const constructNonHomePage = (paramConditions: string) => {
  console.log("THERE WAS NO SEARCH TERM AND NO FILTERS for non home page");
  return `*[_type == "product" && defined(slug) && (${paramConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    materials,
    categories,
    "collections": collections[]->{
      _id,
      _key,
      title,
    }
  }`
}

/* For non home pages pages with filters */
const constructNonHomePagePlusFilters = (paramConditions: string, searchTerm: string) => {
  const isNumeric = !isNaN(Number(searchTerm));
  const costFilter = isNumeric ? `cost == ${Number(searchTerm)}` : "";
  const keywords = searchTerm?.split(" ").filter((term) => term.trim() !== "");

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
    .join(" && ");

  return `*[_type == "product" && defined(slug) ${costFilter ? ` && ${costFilter}` : ""} && (
    ${keywordConditions}) && (${paramConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    materials,
    categories,
    "collections": collections[]->{
      _id,
      _key,
      title,
    }
  }`;
}

export const PRODUCT_IMAGE_QUERY = (id: string) => {
  return `*[_type == product && _id == "${id}"] {
    mainImage,
    imageGallery,
  }`
} 


