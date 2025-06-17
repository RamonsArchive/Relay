"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid, customAlphabet } from "nanoid";
import { fetchPopularCategories, fetchRecentSearches, fetchRecentyViewedProducts, verifyNoUserReview } from "@/lib/serverActions";
import { client } from "@/sanity/lib/client";
import { CartType, ReviewType, categoriesType } from "@/globalTypes";
import slugify from "slugify";
import { parseServerActionResponse, sanitizeSearchQuery } from "@/lib/utils";
import {auth} from "@/auth";
import { sanitizeSanityId } from "@/lib/utils";
import { rateLimiter } from "@/lib/rateLimiter";
import isUrl from "is-url"
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

export const uploadImageStringToSanity = async (imageUrl: string, userId?: string) => {
  try {
    if (!userId) {
      const session = await auth();
      userId = session?.user?.id;
    }

    if (!userId) {
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

    const {success} = await rateLimiter.limit(userId);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    // Fetch the image as an array buffer
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" }) as any;

    const imageBuffer = Buffer.from(response.data);

    // Upload the image to Sanity
    const uploadImage = await writeClient.assets.upload("image", imageBuffer, {
      filename: `${nanoid()}.jpg`,
    });

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

   console.log("passed asnitized check");
   if (!session || userIdSanitized !== sessionId) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    })
   }

   console.log("passed auth check")

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
      console.log("In the try block");
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
      if (!userId) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Unauthorized request"
        })
      }
      const productIdSanitized = sanitizeSanityId(productId);
      const userIdSanitized = sanitizeSanityId(userId);

      if (!productIdSanitized || !userIdSanitized) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Malformed product ID or user ID"
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
    if (!userId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }
    const userIdSanitized = sanitizeSanityId(userId);
    const productIdSanitized = sanitizeSanityId(productId);

    if (!userIdSanitized || !productIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Malformed user ID or productID"
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
      .withConfig({useCdn: true})
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
  console.log("In write recent search");
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
    let updatedRecentSearches = recentSearches;

    updatedRecentSearches = [newSearch, ...updatedRecentSearches];
    updatedRecentSearches = updatedRecentSearches.slice(0,100);

    const result = await writeClient
      .withConfig({useCdn: true})
      .patch(userIdSanitized)
      .set({"recentSearches": updatedRecentSearches})
      .commit()
      .catch(err => console.error("Sanity patch failed", err));

    if (!result) {
      console.error("Sanity update failed", result);
      return parseServerActionResponse({ status: "ERROR", error: "Sanity update failed" });
    }
    console.error("Result for recent searches", result);

    return parseServerActionResponse({
      ...result,
      status: "SUCCESS",
      error: "",
    })
    
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

     if (!editData) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Review edit can't be empty"
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

  try {

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

export const writeFlaggedReview = async (userId: string, reviewId: string, flagReason: string) => {

  console.log("In write flagged review");
  if (!flagReason) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "No flag reason provided"
    })
  }

  const session = await auth();
  const sessionId = session?.user?.id;
  const userIdSanitized = sanitizeSanityId(userId);
  const reviewIdSanitized = sanitizeSanityId(reviewId);

  if (!userIdSanitized || !reviewIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Malformed user ID or review ID"
    })
  }

  if (!session || sessionId != userIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    })
  }

  const existingReview = await client.fetch(`*[_type == "reviews" && _id == $reviewIdSanitized][0]`, {reviewIdSanitized});

  if (!existingReview) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Review not found"
    })
  }

  const { success } = await rateLimiter.limit(`${userIdSanitized}:writeFlaggedReview`);
  if (!success) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Too many requests. Please try again later"
    })
  }

  try {
    const newReviewFlag = {
      _type: "flaggedReviews",
      review: {_type: "reference", _ref: reviewIdSanitized},
      flaggedBy: {_type: "reference", _ref: userIdSanitized},
      flagReason: flagReason,
      createdAt: new Date().toISOString(),
      moderationStatus: "pending",
    }

    const result = await writeClient
      .withConfig({useCdn: true})
      .create(newReviewFlag)

    return parseServerActionResponse({
      ...result,
      status: "SUCCESS",
      error: ""
    })

  } catch (error) {
    console.error(error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}

export const deleteReviewFlag = async (userId: string, flaggedReviewId: string) => { 
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const flaggedReviewIdSanitized = sanitizeSanityId(flaggedReviewId);
    const userIdSanitized = sanitizeSanityId(userId);

    if (!flaggedReviewIdSanitized || !userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Malformed user ID or flagged review ID"
      })
    }

    if (!session || sessionId != userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    const existingReview = await client.fetch(`*[_type == "flaggedReviews" && review._ref == $flaggedReviewIdSanitized && flaggedBy._ref == $userIdSanitized][0]`, {flaggedReviewIdSanitized, userIdSanitized});
    const existingReviewID = existingReview?._id;
    if (!existingReview) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Flagged review not found"
      })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:deleteReviewFlag`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const result = await writeClient
      .withConfig({useCdn: false})
      .transaction()
      .patch(existingReviewID, (patch) => patch.unset(["flaggedBy", "review" ]))
      .delete(existingReviewID)
      .commit();
      
    return parseServerActionResponse({
      ...result,
      status: "SUCCESS",
      error: ""
    });


  } catch (error) {
    console.error("Error deleting review flag", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}

export const addToBasket = async (userId: string, productId: string, color: string, size: string, quantity: number, temp_cartId?: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);
    const productIdSanitized = sanitizeSanityId(productId);
    
    if (!temp_cartId) {
      temp_cartId = crypto.randomUUID();
      const cookieJar = await cookies();
      cookieJar.set("temp_cartId", temp_cartId, {
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    console.log("temp_cartId", temp_cartId);

    const findCartBy = userIdSanitized ? { userId: userIdSanitized } : { tempCartId: temp_cartId };

    if (!findCartBy) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (findCartBy.userId === userIdSanitized && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (!productIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid product ID"
      });
    }
  
    if (!quantity || quantity <= 0) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid quantity"
      })
    }

    const {success} = await rateLimiter.limit(`${userIdSanitized}:addToBasket`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productIdSanitized,
      }, 
      include: {
        variants: true,
      }
    })

    if (!existingProduct) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Product not found"
      })
    }

    const existingVariant = await prisma.variant.findUnique({
      where: {
        productId_size_color: {
          productId: productIdSanitized,
          size: size,
          color: color,
        }
      }
    })

    if (!existingVariant) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Variant (productId+size+color) not found"
      })
    }

    if (existingVariant.stockQuantity < quantity) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Variant quantity is not available"
      })
    }

    const findCartWhere = userIdSanitized ? { userId: userIdSanitized } : { tempCartId: temp_cartId };

    // fetch or create the cart
    let cart = await prisma.cart.upsert({
      where: findCartWhere,
      create: userIdSanitized ? {
        userId: userIdSanitized
      } : {
        tempCartId: temp_cartId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      },
      update: {}
    });

    // ✅ FIXED: Handle transaction errors properly
    const upsertResult = await prisma.$transaction(async (tx: any) => {
      const existingCartItem = await tx.cartItem.findUnique({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: existingVariant.id,
          }
        },
        select: {
          id: true, 
          quantity: true,
        }
      })
      
      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + quantity;
        console.log("newQuantity", newQuantity);
        console.log("existingVariant.stockQuantity", existingVariant.stockQuantity);
        
        // ✅ FIXED: Throw error instead of returning error response
        if (newQuantity > existingVariant.stockQuantity) {
          throw new Error("Quantity is not available");
        }
        
        const updated = await tx.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: newQuantity, 
            updatedAt: new Date(),
          }
        })
        
        return updated; // ✅ Return just the data, not wrapped response
      } else {
        const newCartItem = await tx.cartItem.create({
          data: {
            cart: { connect: { id: cart.id }},
            variant: { connect: { id: existingVariant.id}},
            quantity: quantity,
          }
        })
        
        return newCartItem; // ✅ Return just the data, not wrapped response
      }
    });

    // ✅ FIXED: Only wrap with success if transaction completed
    return parseServerActionResponse({
      ...upsertResult,
      status: "SUCCESS",
      error: "",
    })
    
  } catch (error) {
    console.error("Error adding to basket", error);
    
    // ✅ FIXED: Handle specific error messages
    if (error instanceof Error && error.message === "Quantity is not available") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Quantity is not available"
      })
    }
    
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
};


export const updateDataBaseQuantities = async (userId: string, variantId: string, productId: string, newQuantity: number, temp_cartId?: string | null) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);
    const productIdSanitized = sanitizeSanityId(productId);

    if (!userIdSanitized && !temp_cartId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (userIdSanitized && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    if (!productIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid product ID"
      })
    }

    const {success} = await rateLimiter.limit(`${userIdSanitized}:updateDataBaseQuantities`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    // get cart info from the userId and then get the varaint from the productid and then get cartItem from the cartId and the variantId combined
    const transaction = await prisma.$transaction(async (tx: any) => {
      const whereClause = userIdSanitized ? { userId: userIdSanitized } : { tempCartId: temp_cartId };
      const cart = await tx.cart.findUnique({
        where: whereClause,
        select: {
          id: true,
        }
      })

      if (!cart) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Cart not found"
        })
      }
  
      const updateCartQuantity = await tx.cartItem.update({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: variantId,
          }
        },
        data: {
          quantity: newQuantity,
        }
      })

      if (!updateCartQuantity) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Failed to update cart quantity"
        })
      }

      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
      })
    }
  )
  revalidatePath("/cart");
  return transaction;
  } catch (error) {
    console.error("Error updating data base quantities", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}


export const deleteBasketItem = async (userId: string, variantId: string, cartId: number) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!userIdSanitized && !cartId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    } 
    if (userIdSanitized && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:deleteBasketItem`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const deleteItem = await prisma.cartItem.delete({
      where: {
        cartId_variantId: {
          cartId: cartId,
          variantId: variantId,
        }
      }
    })

    if (!deleteItem) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to delete item from cart"
      })
    }
    revalidateTag("cart-count");
    revalidatePath("/cart");
    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
    })

  } catch (error) {
    console.error("Error deleting basket item", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}



export const checkCartSync = async (userId: string, temp_cartId: string) => {
  const session = await auth();
  const sessionId = session?.user?.id;
  const userIdSanitized = sanitizeSanityId(userId);
  const temp_cartIdSanitized = sanitizeSanityId(temp_cartId);

  if (!userIdSanitized && !temp_cartIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    })
  }

  if (userIdSanitized && sessionId !== userIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    })
  }

  let cart: CartType | null = null;
  if (!userId) {
    cart = await prisma.cart.findUnique({
      where: { tempCartId: temp_cartId },
      include: { items: true },
    });
    if (!cart) {
      await prisma.cart.create({
        data: {
          tempCartId: temp_cartId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
      });
    }
  } else {
    if (temp_cartId) {
      await syncCart(temp_cartId, userId);
    }
    cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) {
      await prisma.cart.create({
        data: { userId },
      });
    }
  }

  if (!cart) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to create or sync cart"
    })
  }

  return parseServerActionResponse({
    status: "SUCCESS",
    error: "",
    cart: cart,
  })
}


const syncCart = async (guestId: string, userId: string) => {
  const cookieJar = await cookies();
  const guestCart = await prisma.cart.findUnique({
    where: { tempCartId: guestId },
    include: { items: true },
  });

  if (!guestCart || guestCart.items.length === 0) return;

  let userCart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!userCart) {
    await prisma.cart.create({
      data: {
        userId,
        items: {
          create: guestCart.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
          }))
        }
      }
    });
  } else {
    for (const item of guestCart.items) {
      const existingItem = userCart.items.find(i => i.variantId === item.variantId);
      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            variantId: item.variantId,
            quantity: item.quantity,
          },
        });
      }
    }
  }

  await prisma.cart.delete({ where: { tempCartId: guestId } });
  cookieJar.delete("temp_cartId");
};






// 1. Apply promo code to cart (works for both temp and user carts)
export const applyPromoCodeToCart = async (
  code: string, 
  cartId: number, 
  cartTotal: number,
  userId?: string // Optional for temp carts
) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId || "");

    if (!userIdSanitized && !cartId) {
      return parseServerActionResponse({
        status: "ERROR",  
        error: "Unauthorized request"
      })
    }

    if (userIdSanitized && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:applyPromoCodeToCart`); 
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const promoCode = await prisma.promoCode.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
        validFrom: { lte: new Date() },
        OR: [
          { validTo: null },
          { validTo: { gte: new Date() } }
        ]
      },
      include: {
        userUsages: userId ? {
          where: { userId },
          select: { id: true }
        } : undefined,
        _count: {
          select: { orders: true }
        }
      }
    });

    // Basic validation checks
    if (!promoCode) {
      return parseServerActionResponse({ status: "ERROR", error: "Invalid promo code" });
    }

    if (promoCode.maxUses && promoCode._count.orders >= promoCode.maxUses) {
      return parseServerActionResponse({ status: "ERROR", error: "Promo code has reached maximum uses" });
    }

    if (cartTotal < promoCode.minOrderAmount) {
      return parseServerActionResponse({ status: "ERROR", error: `Minimum order of $${(promoCode.minOrderAmount / 100).toFixed(2)} required` });
    }

    let requiresVerification = false;
    let verificationMessage = "";

    // Handle user-specific validations
    if (userId) {
      // For authenticated users, check usage limits
      if (promoCode.userUsages && promoCode.userUsages.length >= promoCode.maxUsesPerUser) {
        return parseServerActionResponse({ status: "ERROR", error: "You've already used this promo code" });
      }

      // Check first-time customer requirement
      if (promoCode.isFirstTimeOnly) {
        const existingOrders = await prisma.order.count({
          where: { userId, status: { in: ['completed', 'processing'] } }
        });
        if (existingOrders > 0) {
          return parseServerActionResponse({ status: "ERROR", error: "This code is only for first-time customers" });
        }
      }
    } else {
      // For temp carts, flag verification needed
      if (promoCode.isFirstTimeOnly) {
        requiresVerification = true;
        verificationMessage = "This code is for first-time customers only. We'll verify eligibility when you sign in.";
      } else if (promoCode.maxUsesPerUser < 999) {
        requiresVerification = true;
        verificationMessage = "Usage limits apply. We'll verify eligibility when you sign in.";
      }
    }

    // Calculate discount
    const discountAmount = calculateDiscount(promoCode, cartTotal);

    // Update cart with promo code
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        appliedPromoCodeId: promoCode.id,
        promoDiscountAmount: discountAmount,
        promoAppliedAt: new Date(),
        requiresPromoVerification: requiresVerification
      }
    });

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      promoCode: {
        id: promoCode.id,
        code: promoCode.code,
        name: promoCode.name,
        discountPercentage: promoCode.discountPercentage,
        discountAmount,
        description: promoCode.description,
        requiresVerification,
        verificationMessage
      }
    });

  } catch (error) {
    console.error('Error applying promo code to cart:', error);
    return parseServerActionResponse({ status: "ERROR", error: "Failed to apply promo code" });
  }
};

// 2. Remove promo code from cart
export const removePromoCodeFromCart = async (cartId: number) => {
  try {
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        appliedPromoCodeId: null,
        promoDiscountAmount: null,
        promoAppliedAt: null,
        requiresPromoVerification: false
      }
    });
    return parseServerActionResponse({ status: "SUCCESS", error: "" });
  } catch (error) {
    console.error('Error removing promo code from cart:', error);
    return parseServerActionResponse({ status: "ERROR", error: "Failed to remove promo code" });
  }
};

// 3. Validate promo code during checkout (when user signs in or places order)
export const validatePromoCodeForOrder = async (
  cartId: number,
  userId: string,
  finalCartTotal: number
) => {
  try {

    const cart = await prisma.cart.findFirst({
      where: { id: cartId },
      include: {
        appliedPromoCode: true
      }
    });

    if (!cart?.appliedPromoCode) {
      return parseServerActionResponse({ status: "SUCCESS", error: "" }); // No promo code applied
    }

    const promoCode = cart.appliedPromoCode;

    // Re-check all validations with user context
    if (!promoCode.isActive) {
      return parseServerActionResponse({ status: "ERROR", error: "Promo code is no longer active" });
    }

    // Check if expired
    if (promoCode.validTo && promoCode.validTo < new Date()) {
      return parseServerActionResponse({ status: "ERROR", error: "Promo code has expired" });
    }

    // Check usage limits
    const userUsageCount = await prisma.promoCodeUsage.count({
      where: { 
        promoCodeId: promoCode.id,
        userId: userId,
        status: 'applied'
      }
    });

    if (userUsageCount >= promoCode.maxUsesPerUser) {
      return parseServerActionResponse({ status: "ERROR", error: "You've already used this promo code" });
    }

    // Check first-time customer requirement
    if (promoCode.isFirstTimeOnly) {
      const existingOrders = await prisma.order.count({
        where: { userId, status: { in: ['completed', 'processing'] } }
      });
      if (existingOrders > 0) {
        return parseServerActionResponse({ status: "ERROR", error: "This code is only for first-time customers" });
      }
    }

    // Check total usage limit
    if (promoCode.maxUses) {
      const totalUsage = await prisma.order.count({
        where: { 
          promoCodeId: promoCode.id,
          status: { in: ['completed', 'processing'] }
        }
      });
      if (totalUsage >= promoCode.maxUses) {
        return parseServerActionResponse({ status: "ERROR", error: "Promo code has reached maximum uses" });
      }
    }

    // Check minimum order amount
    if (finalCartTotal < promoCode.minOrderAmount) {
      return parseServerActionResponse({ status: "ERROR", error: `Minimum order of $${(promoCode.minOrderAmount / 100).toFixed(2)} required` });
    }

    // Recalculate discount in case cart total changed
    const discountAmount = calculateDiscount(promoCode, finalCartTotal);

    // Update cart with new discount amount
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        promoDiscountAmount: discountAmount,
        requiresPromoVerification: false
      }
    });

    return parseServerActionResponse({ status: "SUCCESS", error: "", promoCode: promoCode, discountAmount: discountAmount });

  } catch (error) {
    console.error('Error validating promo code for order:', error);
    return parseServerActionResponse({ status: "ERROR", error: "Failed to validate promo code" });
  }
};

// 4. Transfer promo code from cart to order during order creation
export const transferPromoCodeToOrder = async (
  cartId: number,
  orderId: number,
  userId: string
) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { id: cartId },
      include: { appliedPromoCode: true }
    });

    if (!cart?.appliedPromoCode) {
      return parseServerActionResponse({ status: "SUCCESS", error: "" }); // No promo code to transfer
    }

    // Update order with promo code details
    await prisma.order.update({
      where: { id: orderId },
      data: {
        promoCodeId: cart.appliedPromoCodeId,
        promoCodeUsed: cart.appliedPromoCode.code,
        discountAmount: cart.promoDiscountAmount
      }
    });

    // Create usage record
    await prisma.promoCodeUsage.create({
      data: {
        promoCodeId: cart.appliedPromoCodeId!,
        userId: userId,
        orderId: orderId,
        discountApplied: cart.promoDiscountAmount!,
        orderAmount: 0, // You'll need to pass the actual order amount
        status: 'applied'
      }
    });

    // Update promo code usage count and last used date
    await prisma.promoCode.update({
      where: { id: cart.appliedPromoCodeId as number},
      data: {
        usageCount: { increment: 1 },
        lastUsedAt: new Date()
      }
    });

    return parseServerActionResponse({ status: "SUCCESS", error: "" });

  } catch (error) {
    console.error('Error transferring promo code to order:', error);
    return parseServerActionResponse({ status: "ERROR", error: "Failed to transfer promo code" });
  }
};

// Helper function to calculate discount
const calculateDiscount = (promoCode: any, cartTotal: number): number => {
  let discountAmount = 0;
  
  if (promoCode.discountCents) {
    discountAmount = promoCode.discountCents;
  } else if (promoCode.discountPercentage) {
    discountAmount = Math.floor(cartTotal * promoCode.discountPercentage / 100);
  }

  // Apply maximum discount cap
  if (promoCode.maxDiscountAmount && discountAmount > promoCode.maxDiscountAmount) {
    discountAmount = promoCode.maxDiscountAmount;
  }

  // Can't discount more than cart total
  return Math.min(discountAmount, cartTotal);
};





