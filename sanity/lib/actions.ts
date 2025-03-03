"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import { fetchPopularCategories, fetchRecentSearches } from "./client";
import { ReviewType, categoriesType } from "@/globalTypes";
import slugify from "slugify";
import { parseServerActionResponse } from "@/lib/utils";


export const uploadImageToSanity = async (imageFile: File) => {
  console.log("Uploading file:", imageFile);
  try {
    if (!imageFile) {
      console.log("No file provided");
      return null;
    }

    const uploadImage = await writeClient.assets.upload("image", imageFile, {
      filename: imageFile.name || `${nanoid()}.jpg`,
    });

    console.log("Upload Success:", uploadImage);
    return uploadImage._id;
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  }
};

export const uploadImageStringToSanity = async (imageUrl: string) => {
  console.log("Image url", imageUrl);
  try {
    if (!imageUrl) {
      console.log("No image URL provided");
      return null;
    }

    // Fetch the image as an array buffer
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" }) as any;
    console.log("Response", response);

    const imageBuffer = Buffer.from(response.data);
    console.log("Image Buffer", imageBuffer);

    // Upload the image to Sanity
    const uploadImage = await writeClient.assets.upload("image", imageBuffer, {
      filename: `${nanoid()}.jpg`,
    });

    console.log("Upload Success:", uploadImage);
    return uploadImage._id;
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  }
};

export const handleHeartWrite = async (userId: string, productId: string, hearted: boolean) => {  
   const userIdString = userId;
   if (!userIdString || !productId) {
    throw new Error("No user ID provided");
   }

    if (!hearted) {
      try {
      await writeClient.withConfig({useCdn: false})
      .patch(userIdString)
      .unset([`heartedProducts[_ref=="${productId}"]`])
      .commit();
    } catch (error) {
        console.error("Error setting the heart", error);
      }
    } else {
        try {
            const mykey = nanoid();
            const newProductReference = {
                _type: "reference",
                _ref: productId,
                _key: mykey,
            }
            await writeClient
                .withConfig({useCdn: false})
                .patch(userIdString)
                .setIfMissing({heartedProducts: []})
                .append("heartedProducts", [newProductReference])
                .commit();
        }
         catch (error) {
            console.error("Error removing the heart", error);
        }
      }
  } 

  export const handleRecentyViewedProductsWrite = async (productId: string, userId: string, recentlyViewedProducts: any) => {
    try {
      if (!userId || !productId) {
        throw new Error("No user ID provided");
      }
      const myKey = nanoid();

      const productIdString = productId;

      const newProductReference = {
        _type: "reference",
        _ref: productIdString,
        _key: myKey,
      }

      let updatedProducts = recentlyViewedProducts || []
      updatedProducts = updatedProducts.filter((product: any) => product._ref !== productIdString);
      updatedProducts = [newProductReference, ...updatedProducts];
      updatedProducts = updatedProducts.slice(0, 100);

      await writeClient
        .withConfig({useCdn: false})
        .patch(userId)
        .set({"recentlyViewedProducts": updatedProducts})
        .commit();
    } catch (error) {
      console.error("Error writing recently viewed products", error);
    } 

  }

export const writePopularCategories = async (userId: string, productId: string, categories: categoriesType[]) => {
  try {
    if (!userId) {
      throw new Error("No user ID provided");
    }

    const dereferencedCategories = categories.map((obj: any) => obj.name);

    const popularCategories = await fetchPopularCategories(userId);
    let updatedPopularCategories = dereferencedCategories;
    updatedPopularCategories = [...dereferencedCategories, ...popularCategories];

    updatedPopularCategories = updatedPopularCategories.slice(0, 100);

    await writeClient
      .withConfig({useCdn: false})
      .patch(userId)
      .set({"popularCategories": updatedPopularCategories})
      .commit();
  } catch (error) {
    console.error("Error writing popular categories", error);
    return;
  }
};

export const writeRecentSearch = async (userId: string, searchQuery: string) => {
  try {
    if (!userId) {
      throw new Error("No user ID provided");
    }

    const myKey = nanoid();
    const newSearch = {
      query: searchQuery,
      timestamp: Date.now(),
      _key: myKey,
    }

    let recentSearches = await fetchRecentSearches(userId);
    console.log("Recent searches", recentSearches);
    let updatedRecentSearches = recentSearches;

    updatedRecentSearches = [newSearch, ...updatedRecentSearches];
    updatedRecentSearches = updatedRecentSearches.slice(0,100);
    console.log("updated recent searhces", updatedRecentSearches);

    await writeClient
      .withConfig({useCdn: false})
      .patch(userId)
      .set({"recentSearches": updatedRecentSearches})
      .commit();
    
  } catch (error) {
    console.error("Error writing recent search", error);
    return;
  }
}

export const writeReview = async (userId: string, productId: string, review: ReviewType) => {
  console.log("Review has been received", review);
  console.log("Product Id", productId);
  console.log("User ID", userId);
  try {
    if (!userId) {
      console.error("No user Id provided")
      throw new Error("No user ID provided");
    }
    if (!productId) {
      console.error("No product Id provided");
      throw new Error("No product Id provided");
    }

    console.log("Review", review);

    const reviewInfo = {
      mainRating: review.mainRating,
      wouldRecommend: review.wouldRecommend,
      review: review.review,
      reviewTitle: review.reviewTitle,
      sizeRating: review.sizeRating,
      widthRating: review.widthRating,
      comfortRating: review.comfortRating,
      qualityRating: review.qualityRating,
      valueRating: review.valueRating,
      photo: review.photo,
      nickname: review.nickname,
      email: review.email,
    }
    console.log("Review Info",  reviewInfo);
    const myKey = nanoid();
    console.log("My Key", myKey);
    const mySlug = slugify(`${reviewInfo.nickname}-${reviewInfo.reviewTitle}-${userId.slice(-4)}`, 
      {lower: true, 
      strict: true});

    const newReview = {
      _type: "reviews",
      _id: myKey,
      _key: myKey,
      slug: {
        _type: "slug",
        current: mySlug
      },
      user: {_type: 'user', _ref: userId},
      product: {_type: 'product', _ref: productId},
      ...reviewInfo
    }

    console.log("New Review", newReview);

    
    const transaction = writeClient
      .transaction()
      .create(newReview)
      .patch(userId, (patch) => 
        patch.prepend("userReviews", [{_type: 'reference', _ref: newReview._id, _key: nanoid()}])
      ).patch(productId, (patch) => 
        patch.prepend("productReviews", [{_type: 'reference', _ref: newReview._id, _key: nanoid()}])
      );

    const result = await transaction.commit();

    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS'
    });
  } catch (error) {
    console.error("Error writing review", error);

    return parseServerActionResponse({
      status: "ERROR",
      error: error
    })
    
  }
}

