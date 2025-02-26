
/*TODO: Fix the cost function  */
export const PAGE_QUERY = (path: string, query: string, filters: string, heartedProductsIds: string[]) => {
  const pageType = path.split("/")[0]; // first part of the path
  const pageEnd = path.split("/").pop(); // last part of the path
  const optimizedHeartedProductsIds = `[${heartedProductsIds.map(id => `"${id}"`).join(", ")}]`;

  console.log(`Page Type: ${pageType}`);
  console.log(`Page End: ${pageEnd}`);
  console.log(`Query: ${query}`);
  console.log(`Filters: ${filters}`);

  const filtersArray = filters ? filters?.split(",") : [];
  const queryArray = query ? query?.split(" ").filter((term) => term.trim() !== "") : [];

  const searchTerm = [...new Set([...filtersArray, ...queryArray])].join(" ");
  
  if (path === "/") {
    if (searchTerm == "") {
      console.log("NO SEARCH TERM and home page");
      return `*[_type == "product"] {
        _id,
        title,
        mainImage,
        "materials": materials[]->{
          _id,
          _key,
          name,
        },
        "categories": categories[]->{
          _id,
          _key,
          name,
        },
        "collections": collections[]->{
          _id,
          _key,
          title,
        }
      }`; 
    } else if (filters == "") {
      console.log("SEARCH TERM and home page");
      return constructQuerySearch(searchTerm, optimizedHeartedProductsIds);
    } else if (query == "") {
      console.log("FILTERS and home page");
      return constructHomePageFilters(searchTerm, optimizedHeartedProductsIds);
    } else {
      console.log(`Query and filter no path`)
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
    
   if (!searchTerm) {
    console.log("NO SEARCH TERM and NO FILTERS for non home page");
    return constructNonHomePage(paramConditions, optimizedHeartedProductsIds);
   }

   console.log.apply("NO SEARCH TERM and FILTERS for non home page");
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
      (
      title match "${keyword}*" ||
      "${keyword}" in gender ||
      "${keyword}" in kids ||
      "${keyword}" in size ||
      count(collections[@->title match "${keyword}"]) > 0 ||
      count(colors[@->name match "${keyword}"]) > 0 ||
      count(brands[@->name match "${keyword}"]) > 0 ||
      count(materials[@->name match "${keyword}"]) > 0 ||
      count(categories[@->name match "${keyword}"]) > 0 ||
      "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
      )
    `
    )
    .join(" || ");

  return `*[_type == "product" && defined(slug) ${costFilter ? ` && ${costFilter}` : ""} && (
    ${keywordConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    "materials": materials[]->{
      _id,
      _key,
      name,
    },
    "categories": categories[]->{
      _id,
      _key,
      name,
    },
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
  console.log("HOME PAGE WITH FILTERS")

  const keywordConditions = keywords
    .map(
      (keyword) => `
      (
      title match "${keyword}*" ||
      "${keyword}" in gender ||
      "${keyword}" in kids ||
      "${keyword}" in size ||
      count(collections[@->title match "${keyword}"]) > 0 ||
      count(colors[@->name match "${keyword}"]) > 0 ||
      count(brands[@->name match "${keyword}"]) > 0 ||
      count(materials[@->name match "${keyword}"]) > 0 ||
      count(categories[@->name match "${keyword}"]) > 0 ||
      "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
      )
    `
    ).join(" && ");

  console.log("keywordConditions", keywordConditions);

  return `*[_type == "product" && defined(slug) && (${keywordConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    "materials": materials[]->{
      _id,
      _key,
      name,
    },
    "categories": categories[]->{
      _id,
      _key,
      name,
    },
    "collections": collections[]->{
      _id,
      _key,
      title,
    },
    "isHearted": _id in ${optimizedHeartedProductsIds}
  }`
}

const constructQueryPlusFilters = (queryArray: string[], filtersArray: string[], optimizedHeartedProductsIds: string) => {
  const  keywordConditions = queryArray.map((keyword) => 
    `
    (
    title match "${keyword}*" ||
    "${keyword}" in gender ||
    "${keyword}" in kids ||
    "${keyword}" in size ||
    count(collections[@->title match "${keyword}"]) > 0 ||
    count(colors[@->name match "${keyword}"]) > 0 ||
    count(brands[@->name match "${keyword}"]) > 0 ||
    count(materials[@->name match "${keyword}"]) > 0 ||
    count(categories[@->name match "${keyword}"]) > 0 ||
    "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
    )
  `)
  .join(" || ");
  console.log("keywordConditions", keywordConditions);

  const filterConditions = filtersArray.map((filter) => 
    `
    (
    title match "${filter}*" ||
    "${filter}" in gender ||
    "${filter}" in kids ||
    "${filter}" in size ||
    count(collections[@->title match "${filter}"]) > 0 ||
    count(colors[@->name match "${filter}"]) > 0 ||
    count(brands[@->name match "${filter}"]) > 0 ||
    count(materials[@->name match "${filter}"]) > 0 ||
    count(categories[@->name match "${filter}"]) > 0 ||
    "${filter}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
  )
  `)
  .join(" && ");

  console.log("filterConditions", filterConditions);

  return `*[_type == "product" && defined(slug) && (${keywordConditions}) && (${filterConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    "materials": materials[]->{
      _id,
      _key,
      name,
    },
    "categories": categories[]->{
      _id,
      _key,
      name,
    },
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
    "materials": materials[]->{
      _id,
      _key,
      name,
    },
    "categories": categories[]->{
      _id,
      _key,
      name,
    },
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
        (
        title match "${keyword}*" ||
        "${keyword}" in gender ||
        "${keyword}" in kids ||
        "${keyword}" in size ||
        count(collections[@->title match "${keyword}"]) > 0 ||
        count(colors[@->name match "${keyword}"]) > 0 ||
        count(brands[@->name match "${keyword}"]) > 0 ||
        count(materials[@->name match "${keyword}"]) > 0 ||
        count(categories[@->name match "${keyword}"]) > 0 ||
        "${keyword}" in ["hearted", "heart"] && _id in ${optimizedHeartedProductsIds}
        )
      `
    )
    .join(" && ");

  return `*[_type == "product" && defined(slug) ${costFilter ? ` && ${costFilter}` : ""} && (
    ${keywordConditions}) && (${paramConditions})] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    "materials": materials[]->{
      _id,
      _key,
      name,
    },
    "categories": categories[]->{
      _id,
      _key,
      name,
    },
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
    description,
    "materials": materials[]->{
      _id,
      _key,
      name,
    },
    "categories": categories[]->{
      _id,
      _key,
      name,
    },
    "brands": brands[]->{
      _id,
      _key,
      name,
      logo,
    },
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


