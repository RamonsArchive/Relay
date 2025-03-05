"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid, customAlphabet } from "nanoid";
import { fetchPopularCategories, fetchRecentSearches, fetchRecentyViewedProducts, verifyNoUserReview } from "./client";
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

  export const handleRecentyViewedProductsWrite = async (productId: string, userId: string) => {
    try {
      if (!userId || !productId) {
        throw new Error("No user ID provided");
      }

      const recentlyViewedProducts = await fetchRecentyViewedProducts(userId);
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
  try {
    
    if (!userId) {
      console.error("No user Id provided")
      throw new Error("No user ID provided");
    }
    if (!productId) {
      console.error("No product Id provided");
      throw new Error("No product Id provided");
    }

    const existingReview = await verifyNoUserReview(productId, userId);
    if (existingReview.status == "ERROR") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "You already wrote a review for this product"
      })
    }

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
    const nanoidSafe = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 21);
    const myKey = nanoidSafe();
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
      user: {_type: "reference", _ref: userId.toString()},
      product: {_type: "reference", _ref: productId.toString()},
      ...reviewInfo
    }

    console.log("New Review", newReview);

    
    const transaction = writeClient
      .transaction()
      .create(newReview)
      .patch(userId, (patch) => 
        patch
        .setIfMissing({userReviews: []})
        .append("userReviews", [{_type: "reference", _ref: newReview._id, _key: nanoid()}])
      ).patch(productId, (patch) => 
        patch
        .setIfMissing({productReviews: []})
        .append("productReviews", [{_type: "reference", _ref: newReview._id, _key: nanoid()}])
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

export const writeReviewEdit = async (reviewId: string, editData: string) =>  {
  try {
    console.log("Review Id", reviewId);
    console.log("Edit data", editData);
    if (!reviewId) {
      throw new Error("No review id provided");
    }

    const result = await writeClient
      .withConfig({useCdn: false})
      .patch(reviewId)
      .set({
        review: editData,
      })
      .commit();

      console.log("Result", result);
      

      return parseServerActionResponse({
        ...result,
        error: "",
        status: "SUCCESS",
      })
  } catch (error) {
    console.error("Error writing review");
    return parseServerActionResponse({
      status: "ERROR",
      error: error
    })
  }
}

export const deleteReview = async (reviewId: string, productId: string, userId: string) => {
  console.log("In delete reviwe in actions");
  try {
    if (!reviewId) {
      console.error("No review id provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No review id provided"
      })
    }
    if (!productId) {
      console.error("No product id provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No product id provided"
      })
    }

    if (!userId) {
      console.error("No user id provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No user id provided"
      })
    }

    const result = await writeClient
      .withConfig({useCdn: false})
      .transaction()
      .patch(productId, (patch) => patch.unset([`productReviews[_ref=="${reviewId}"]`]))
      .patch(userId, (patch) => patch.unset([`userReviews[_ref=="${reviewId}"]`]))
      .delete(reviewId)
      .commit()

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    })

  } catch (error) {
    console.error("Error deleting review")
    return parseServerActionResponse({
      status: "ERROR",
      error: error,
    })
  }
}

