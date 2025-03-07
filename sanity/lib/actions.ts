"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid, customAlphabet } from "nanoid";
import { client, fetchPopularCategories, fetchRecentSearches, fetchRecentyViewedProducts, verifyNoUserReview } from "./client";
import { ReviewType, categoriesType } from "@/globalTypes";
import slugify from "slugify";
import { parseServerActionResponse, sanitizeSearchQuery } from "@/lib/utils";
import {auth} from "@/auth";
import { sanitizeSanityId } from "@/lib/utils";
import { rateLimiter } from "@/lib/rateLimiter";
import isUrl from "is-url"


export const uploadImageToSanity = async (imageFile: File) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;

    if (!session || !sessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (!imageFile) {
      console.log("No file provided");
      return parseServerActionResponse({
        status: "ERROR",
        error: "No file provided",
      })
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedMimeTypes.includes(imageFile.type)) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.",
      });
    }


    if (imageFile.size > 5  * 1024 * 1024) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "File too large. Max (5MB)"
      })
    }

    const { success } = await rateLimiter.limit(`${sessionId}:uploadImage`);
    if (!success){
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const uploadImage = await writeClient.assets.upload("image", imageFile, {
      filename: imageFile.name || `${nanoid()}.jpg`,
    });

    console.log("Upload Success:", uploadImage);
    return uploadImage._id;
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
};

export const uploadImageStringToSanity = async (imageUrl: string) => {
  console.log("Image url", imageUrl);
  try {
    const session = await auth();
    const sessionId = session?.user?.id;

    if (!session || !sessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (!imageUrl) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No image url provided"
      })
    }

    if (!isUrl(imageUrl)) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid image url"
      })
    }

    const headResponse = await axios.head(imageUrl);
    const contentType = headResponse.headers["content-type"];

    if (!contentType.startsWith("image/")) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid content type. Only image URLs are allowed.",
      });
    }

    const {success} = await rateLimiter.limit(sessionId);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
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
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
};

export const handleHeartWrite = async (userId: string, productId: string, hearted: boolean) => {  
   const session = await auth();
   const sessionId = session?.user?.id;
   const userIdSanitized = sanitizeSanityId(userId);
   const productIdSanitized = sanitizeSanityId(productId);

   if (!userIdSanitized || !productIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Malformed user ID or productID"
    })
   }

   if (!session || userIdSanitized !== sessionId) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    })
   }

   const {success} = await rateLimiter.limit(
    `${userIdSanitized}:heartWrite`
  )
   if (!success) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Too many requests. Please try again later"
    })
   }

    if (!hearted) {
      try {
      const result = await writeClient.withConfig({useCdn: false})
      .patch(userIdSanitized)
      .unset([`heartedProducts[_ref=="${productIdSanitized}"]`])
      .commit();

      return parseServerActionResponse({
        ...result,
        status: "SUCCESS",
        error: ""
      })
    } catch (error) {
        console.error("Error setting the heart", error);
        return parseServerActionResponse({
          status: "ERROR",
          error: "Failed to remove heart"
        })
      }
    } else {
        try {
            const mykey = nanoid();
            const newProductReference = {
                _type: "reference",
                _ref: productIdSanitized,
                _key: mykey,
            }
            const result = await writeClient
                .withConfig({useCdn: false})
                .patch(userIdSanitized)
                .setIfMissing({heartedProducts: []})
                .append("heartedProducts", [newProductReference])
                .commit();
                
            return parseServerActionResponse({
              ...result,
              status: "SUCCESS",
              error: ""
            })
        }
         catch (error) {
            console.error("Error removing the heart", error);
            return parseServerActionResponse({
              status: "ERROR",
              error: "Failed to add heart"
            })
        }
      }
  } 

  export const handleRecentyViewedProductsWrite = async (productId: string, userId: string) => {
    try {
      const session = await auth();
      const sessionId = session?.user?.id;
      const productIdSanitized = sanitizeSanityId(productId);
      const userIdSanitized = sanitizeSanityId(userId);

      if (!productIdSanitized || !userIdSanitized) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Malformed product ID or user ID"
        })
      }

      if (!session || sessionId != userIdSanitized) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Unauthorised request"
        })
      }

      const {success} = await rateLimiter.limit(`${userIdSanitized}:recentlyViewedProduct`);
      if (!success) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Too many requests. Please try again later"
        })
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
        .patch(userIdSanitized)
        .set({"recentlyViewedProducts": updatedProducts})
        .commit();
    } catch (error) {
      console.error("Error writing recently viewed products", error);
      return parseServerActionResponse({
        status: "ERROR",
        error: "Internal server error"
      })
    } 
  }

export const writePopularCategories = async (userId: string, productId: string, categories: categoriesType[]) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id
    const userIdSanitized = sanitizeSanityId(userId);
    const productIdSanitized = sanitizeSanityId(productId);

    console.log("categoreise", categories);
    console.log("userId", userId);
    console.log("productId", productId);

    if (!userIdSanitized || !productIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Malformed user ID or productID"
      })
    }

    if (!session || sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:writePopularCategories`)

    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const validCategories = categories
      .map((obj: any) => obj.name?.trim())
      .filter((name: string) => typeof name === "string" && name.length > 0 && name.length <= 50);

    if (validCategories.length === 0) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No valid categories provided",
      });
    }

    console.log("Valid categories");

    const dereferencedCategories = categories.map((obj: any) => obj.name);

    const popularCategories = await fetchPopularCategories(userId);
    let updatedPopularCategories = dereferencedCategories;
    updatedPopularCategories = [...dereferencedCategories, ...popularCategories];

    updatedPopularCategories = updatedPopularCategories.slice(0, 100);

    await writeClient
      .withConfig({useCdn: false})
      .patch(userIdSanitized)
      .set({"popularCategories": updatedPopularCategories})
      .commit();
  } catch (error) {
    console.error("Error writing popular categories", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
};

export const writeRecentSearch = async (userId: string, searchQuery: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);
    const sanitizedSearchQuery = sanitizeSearchQuery(searchQuery);
    
    if (!userIdSanitized || !sanitizedSearchQuery) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Malformed user ID or search query"
      })
    }

    if (!session || sessionId != userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized access to another users data"
      })
     }

    const { success } = await rateLimiter.limit(userIdSanitized);

    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    if (sanitizedSearchQuery.length > 100) {
      return parseServerActionResponse({ 
        status: "ERROR", error: "Search query too long" 
      });
    }

    const myKey = nanoid();
    const newSearch = {
      query: sanitizedSearchQuery,
      timestamp: Date.now(),
      _key: myKey,
    }

    let recentSearches = await fetchRecentSearches(userIdSanitized);
    console.log("Recent searches", recentSearches);
    let updatedRecentSearches = recentSearches;

    updatedRecentSearches = [newSearch, ...updatedRecentSearches];
    updatedRecentSearches = updatedRecentSearches.slice(0,100);
    console.log("updated recent searhces", updatedRecentSearches);

    await writeClient
      .withConfig({useCdn: false})
      .patch(userIdSanitized)
      .set({"recentSearches": updatedRecentSearches})
      .commit();
    
  } catch (error) {
    console.error("errro with recent searches", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}

export const writeReview = async (userId: string, productId: string, review: ReviewType) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);
    const productIdSanitized = sanitizeSanityId(productId);

    if (!userIdSanitized || !productIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Malformed user ID or productID"
      })
     }

     if (!session || userIdSanitized != sessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
     }

     if (sessionId != userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized access to another users data"
      })
     }
 
   const existingReview = await verifyNoUserReview(productId, userId);
    if (existingReview.status == "ERROR") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "You already wrote a review for this product"
      })
    }

    const {success} = await rateLimiter.limit(
      `${userIdSanitized}:writeReview`
    )
    
     if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
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
    const mySlug = slugify(`${reviewInfo.nickname}-${reviewInfo.reviewTitle}-${userIdSanitized.slice(-4)}`, 
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
      user: {_type: "reference", _ref: userIdSanitized.toString()},
      product: {_type: "reference", _ref: productIdSanitized.toString()},
      ...reviewInfo
    }

    console.log("New Review", newReview);

    const transaction = writeClient
      .transaction()
      .create(newReview)
      .patch(userIdSanitized, (patch) => 
        patch
        .setIfMissing({userReviews: []})
        .append("userReviews", [{_type: "reference", _ref: newReview._id, _key: nanoid()}])
      ).patch(productIdSanitized, (patch) => 
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
      error: "Internal server error"
    })
    
  }
}

export const writeReviewEdit = async (reviewId: string, editData: string) =>  {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const reviewIdSanitized = sanitizeSanityId(reviewId);

    if (!reviewIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Malformed review id"
      })
     }

     if (!session || !sessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

     const existingReview = await client.fetch(`*[_type == "reviews" && _id == $reviewIdSanitized][0]`,
      {reviewIdSanitized}
     )

     if (!existingReview) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Review not found",
      });
    }

    if (existingReview.user?._ref !== sessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized: You do not own this review",
      });
    }
     const { success } = await rateLimiter.limit(
      `${reviewIdSanitized}:writeReviewEdit`
    )

    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
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
      error: "Internal server error"
    })
  }
}

export const deleteReview = async (reviewId: string, productId: string, userId: string) => {
  const session = await auth();
  const sessionId = session?.user?.id;
  const productIdSanitized = sanitizeSanityId(productId);
  const userIdSanitized = sanitizeSanityId(userId);
  const reviewIdSanitized = sanitizeSanityId(reviewId);

  console.log("product id", productId);
  console.log("user id", userId);
  console.log("santiized user id", userIdSanitized);
  console.log("santized product id", productIdSanitized);

  if (!productIdSanitized || !userIdSanitized || !reviewIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Malformed user, product, or review id"
    })
  }

  if (!session || sessionId != userIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    })
  }

  const existingReview = await client.fetch(`*[_type == "reviews" && _id == $reviewIdSanitized][0]`, {
    reviewIdSanitized,
  })

  if (!existingReview) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Review not found"
    })
  }

  if (existingReview?.user?._ref != sessionId) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized: You do not own this reivew"
    })
  }

  const { success } = await rateLimiter.limit(`${reviewIdSanitized}:deleteReview`);
  if (!success) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Too many requests. Please try again later"
    })
  }

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
      .patch(productIdSanitized, (patch) => patch.unset([`productReviews[_ref=="${reviewIdSanitized}"]`]))
      .patch(userIdSanitized, (patch) => patch.unset([`userReviews[_ref=="${reviewIdSanitized}"]`]))
      .delete(reviewIdSanitized)
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
      error: "Internal server error",
    })
  }
}

