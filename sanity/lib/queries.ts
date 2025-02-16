import { defineQuery } from 'next-sanity';


/*TODO: Fix the cost function  */
export const PAGE_QUERY = (path: string, query: string, filters: string, heartedProductsIds: string[]) => {
  const pageType = path.split("/")[0]; // first part of the path
  const pageEnd = path.split("/").pop(); // last part of the path
  const optimizedHeartedProductsIds = `[${heartedProductsIds.map(id => `"${id}"`).join(", ")}]`;

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
      return constructQuerySearch(searchTerm, optimizedHeartedProductsIds);
    } else if (query == "") {
      return constructHomePageFilters(searchTerm, optimizedHeartedProductsIds);
    } else {
      return constructQueryPlusFilters(queryArray, filtersArray, optimizedHeartedProductsIds);
    } 
  } 
    
    let genderConditions = "";
    let kidsConditions = "";
    let filteredCollectionsPath = "";
    let heartedConditions = "";
    if (pageEnd == "newarrivals" || pageEnd == "bestsellers"){
      filteredCollectionsPath = pageEnd == "newarrivals" ? "new arrivals" : "best sellers";
    } else if (pageEnd == "men" || pageEnd == "women" || pageEnd == "unisex") {
      genderConditions = pageEnd == "unisex" ? `"unisex" in gender` : `"${pageEnd}" in gender || "unisex" in gender`;
    } else if (pageEnd == "kids" || pageEnd == "boys" || pageEnd == "girls") {
      kidsConditions = pageEnd == "kids" ? `"boys" in kids || "girls" in kids` : pageEnd == "boys" ? `"boys" in kids` : `"girls" in kids`;
    } else if (pageEnd == "hearted") {
      heartedConditions = `_id in ${optimizedHeartedProductsIds}`;
    }

    let paramConditions = "";
    if (!heartedConditions) {
      paramConditions = [
        filteredCollectionsPath ? `count(collections[@->title match "${filteredCollectionsPath}"]) > 0` : `count(collections[@->title match "${pageEnd}"]) > 0`,
        genderConditions,
        kidsConditions,
        heartedConditions
      ].filter(Boolean).join(" || ");
    } else {
      paramConditions = heartedConditions;
    }
    

   console.log(`paramConditions: ${paramConditions}`);
   console.log(`optimizedHeartedProductsIds: ${optimizedHeartedProductsIds}`);
   if (!searchTerm) {
    return constructNonHomePage(paramConditions, optimizedHeartedProductsIds);
   }

   return constructNonHomePagePlusFilters(paramConditions, searchTerm, optimizedHeartedProductsIds);
  
};


export const PRODUCT_ID_QUERY = (id: string) => {
  return `*[_type == "product" && _id == "${id}"] {
  }`
}

/* For query searches only */
const constructQuerySearch = (searchTerm: string, optimizedHeartedProductsIds: string) => {
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
      "${keyword}" in categories ||
      "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
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
    },
    "isHearted": _id in ${optimizedHeartedProductsIds}
  }`;
}

/* For homepage with filters */
const constructHomePageFilters = (searchTerm: string, optimizedHeartedProductsIds: string) => {
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
      "${keyword}" in categories ||
      "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
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
    },
    "isHearted": _id in ${optimizedHeartedProductsIds}
  }`
}

const constructQueryPlusFilters = (queryArray: string[], filtersArray: string[], optimizedHeartedProductsIds: string) => {
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
      "${keyword}" in categories ||
      "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
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
      "${filter}" in categories || 
      "${filter}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
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
    },
    "isHearted": _id in ${optimizedHeartedProductsIds}
  }`
}

/* For non home pages only */
const constructNonHomePage = (paramConditions: string, optimizedHeartedProductsIds: string) => {
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
    },
    "isHearted": _id in ${optimizedHeartedProductsIds}
  }`
}

/* For non home pages pages with filters */
const constructNonHomePagePlusFilters = (paramConditions: string, searchTerm: string, optimizedHeartedProductsIds: string) => {
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
        "${keyword}" in categories ||
        "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
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
    },
    "isHearted": _id in ${optimizedHeartedProductsIds}
  }`;
}

/* Product page only */
export const PRODUCT_PAGE_INFORMATION = (id: string) => {
  return `*[_type == "product" && _id == "${id}"][0] {
    mainImage,
    imageGallery,
    title,
    stock,
    cost,
    size,
    description,
    categories,
    materials,
    brand,
    hearted,
    "collections": collections[]->{
      _id,
      _key,
      title,
    },
    "mainDetails": details.mainDetails[].children[].text,
    "detailBullets": details.detailBullets,
    reviews[] -> {
      _createdAt,
      rating,
      wouldRecommend,
      review,
      reviewTitle,
      sizeRating,
      widthRating,
      comfortRating,
      qualityRating,
      valueRating,
      photo,
      nickname,
      slug,
      email,
    }
  }`
} 

/* Reivew Details only */
export const GET_TOP_REVIEWS = (id: string) => {
  return `*[_type == "product" && _id == "${id}"][0] {
  "reviews": reviews[] -> | order(rating desc, _createdAt desc) [0...3] {
    _createdAt,
    rating,
    wouldRecommend,
    review,
    reviewTitle,
    sizeRating,
    widthRating,
    comfortRating,
    qualityRating,
    valueRating,
    photo,
    nickname,
    slug,
    email
    }
  }`
}


