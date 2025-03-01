"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import { fetchPopularCategories } from "./client";
import {fetchRecentSearches } from "./client";
import { ReviewType, categoriesType } from "@/globalTypes";


export const uploadImageToSanity = async (imageUrl: string) => {
  console.log("Image url", imageUrl);
  try {
    if (!imageUrl) {
      console.log("No image URL provided");
      return;
    }
    const response = await axios.get(imageUrl, {responseType: "arraybuffer"}) as any;
    console.log("Response", response);
    const imageBuffer = Buffer.from(response.data);
    console.log("Image Buffer", imageBuffer);

    const uploadImage = await writeClient.assets.upload("image", imageBuffer, {
      filename: `${nanoid()}.jpg`,
    })

    console.log("Upload Image", uploadImage);

    return uploadImage._id;
    
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  } 
}

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

    await writeClient
      .withConfig({useCdn: false})
      .patch(userId)
      .setIfMissing({recentSearches: []})
      .prepend("recentSearches", [newSearch])
      .commit();
    
  } catch (error) {
    console.error("Error writing recent search", error);
    return;
  }
}

export const writeReview = async (userId: string, review: ReviewType) => {
  console.log("Review", review);
  try {
    console.log("User ID", userId);
    if (!userId) {
      console.log("No user Id provided")
      throw new Error("No user ID provided");
    }

    const reviewInfo = {
      rating: review.rating,
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
    const newReview = await writeClient.create({
      _type: "reviews",
      _key: myKey,
      ...reviewInfo
    })

    console.log("New Review", newReview);
    await writeClient
      .withConfig({useCdn: false})
      .patch(userId)
      .setIfMissing({userReviews: []})
      .prepend("userReviews", [{_type: "reference", _ref: newReview._id}])
      .commit();
  } catch (error) {
    console.error("Error writing review", error);
    return
  }
}

