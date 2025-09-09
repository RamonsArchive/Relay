"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid, customAlphabet } from "nanoid";
import { fetchPopularCategories, fetchRecentSearches, fetchRecentyViewedProducts, verifyNoUserReview } from "@/lib/serverActions";
import { client } from "@/sanity/lib/client";
import { ReviewType, TaxLineItemType, categoriesType, UserType, CartItemForCheckoutType, BasketType, CartWithIncludes } from "@/globalTypes";
import slugify from "slugify";
import { parseServerActionResponse, sanitizeSearchQuery } from "@/lib/utils";
import {auth} from "@/auth";
import { sanitizeSanityId } from "@/lib/utils";
import { clientRateLimiter, rateLimiter } from "@/lib/rateLimiter";
import isUrl from "is-url"
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { sendRefundEmail } from "@/lib/orderRefund";

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

   if (!userIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Malformed user ID"
    })
   }

   if (!productIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Malformed productID"
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

    const findCartWhere = userIdSanitized ? { userId: userId } : { tempCartId: temp_cartId };

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



// ===== UPDATED CART SYNC WITH STRIPE CUSTOMER =====
export const checkCartSync = async (userId: string, temp_cartId: string) => {
  const session = await auth();
  const sessionId = session?.user?.id;
  const userIdSanitized = sanitizeSanityId(userId);
  const temp_cartIdSanitized = sanitizeSanityId(temp_cartId);

  if (!userIdSanitized && !temp_cartIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    });
  }

  if (userIdSanitized && sessionId !== userIdSanitized) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized request"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cart: any | null = null;

  if (!userId) {
    // Handle guest cart
    cart = await prisma.cart.findUnique({
      where: { tempCartId: temp_cartId },
      include: { 
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        },
        appliedPromoCode: true,
        shippingAddress: true
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          tempCartId: temp_cartId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        },
        include: { 
          items: {
            include: {
              variant: {
                include: {
                  product: true
                }
              }
            }
          },
          appliedPromoCode: true,
          shippingAddress: true
        },
      });
    }
  } else {
    // Handle authenticated user cart
    if (temp_cartId) {
      await syncCart(temp_cartId, userId);
    }

    cart = await prisma.cart.findUnique({
      where: { userId },
      include: { 
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        },
        appliedPromoCode: true,
        shippingAddress: true,
        user: true // Include user for Stripe customer creation
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { 
          items: {
            include: {
              variant: {
                include: {
                  product: true
                }
              }
            }
          },
          appliedPromoCode: true,
          shippingAddress: true,
          user: true
        },
      });
    }

    // Ensure user has Stripe customer ID
    if (cart.user && !cart.user.stripeCustomerId) {
      await createStripeCustomerForUser(cart.user);
    }
  }

  if (!cart) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to create or sync cart"
    });
  }

  return parseServerActionResponse({
    status: "SUCCESS",
    error: "",
    cart: cart,
  });
};

// ===== STRIPE CUSTOMER CREATION =====
const createStripeCustomerForUser = async (user: UserType) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      name: user.name || undefined,
      metadata: {
        userId: user.id,
      },
    });

    // Update user with Stripe customer ID
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: stripeCustomer.id },
    });

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: { stripeCustomerId: stripeCustomer.id },
    })
  } catch (error) {
    console.error('Failed to create Stripe customer:', error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to create Stripe customer"
    })
  }
};

// ===== UPDATED SYNC CART FUNCTION =====
const syncCart = async (guestId: string, userId: string) => {
  const cookieJar = await cookies();
  
  const guestCart = await prisma.cart.findUnique({
    where: { tempCartId: guestId },
    include: { 
      items: true,
      appliedPromoCode: true,
      shippingAddress: true
    },
  });

  if (!guestCart || guestCart.items.length === 0) {
    // Clean up empty guest cart
    if (guestCart) {
      await prisma.cart.delete({ where: { tempCartId: guestId } });
    }
    cookieJar.delete("temp_cartId");
    return;
  }

  let userCart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!userCart) {
    // Create new user cart with guest cart data
    await prisma.cart.create({
      data: {
        userId,
        // Transfer promo code if applied
        appliedPromoCodeId: guestCart.appliedPromoCodeId,
        promoDiscountAmount: guestCart.promoDiscountAmount,
        promoAppliedAt: guestCart.promoAppliedAt,
        requiresPromoVerification: guestCart.requiresPromoVerification,
        // Transfer shipping preferences
        shippingMethod: guestCart.shippingMethod,
        shippingAddressId: guestCart.shippingAddressId,
        // Create cart items
        items: {
          create: guestCart.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
          }))
        }
      }
    });
  } else {
    // Merge guest cart into existing user cart
    
    // Transfer promo code if guest cart has one and user cart doesn't
    if (guestCart.appliedPromoCodeId && !userCart.appliedPromoCodeId) {
      await prisma.cart.update({
        where: { id: userCart.id },
        data: {
          appliedPromoCodeId: guestCart.appliedPromoCodeId,
          promoDiscountAmount: guestCart.promoDiscountAmount,
          promoAppliedAt: guestCart.promoAppliedAt,
          requiresPromoVerification: guestCart.requiresPromoVerification,
        }
      });
    }

    // Merge items
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

  // Clean up guest cart
  await prisma.cart.delete({ where: { tempCartId: guestId } });
  cookieJar.delete("temp_cartId");
};


// ====== VERIFY CART FUNCTION =====
export const verifyCart = async (userId: string, cartId: number) => {
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

    if (!userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:verifyCart`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"  
      })
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { id: cartId,
          userId: userIdSanitized,
         },
        include: { items: { include: { variant: true } } },
      });
  
      if (!cart) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Cart not found"
        })
      }
      const cartItems = cart.items;
  
      if (cartItems.length === 0) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Cart is empty"
        })
      }
  
      const variantIds = cartItems.map((item) => item.variantId);
      const existingVariants = new Set<string>();
      const variants = await tx.variant.findMany({
        where: { id: { in: variantIds } },
        select: { id: true, stockQuantity: true }
      })

      for (const variant of variants) {
        existingVariants.add(variant.id);
      }

      const missingVariants = variantIds.filter((id) => !existingVariants.has(id));
      if (missingVariants.length > 0) {
        return parseServerActionResponse({
          status: "ERROR",
          error: `Missing variants: ${missingVariants.join(", ")}`
        })
      }

      for (const item of cartItems) {
        const variant = variants.find((v) => v.id === item.variantId);
        if (!variant) {
          return parseServerActionResponse({
            status: "ERROR",
            error: `Missing variant: ${item.variantId}`
          })
        }

        if (variant.stockQuantity < item.quantity) {
          return parseServerActionResponse({
            status: "ERROR",
            error: `Insufficient stock for variant: ${item.variantId}`
          })
        }  
      }

      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: { cart: cart },
      })
    });

    if (transaction.status === "ERROR") {
      return parseServerActionResponse({
        status: "ERROR",
        error: transaction.error
      })
    }

    const cart = transaction.data.cart;
    if (!cart) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to verify cart"
      })
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      cart: cart,   
    })

    // check if this is a good validation for the cart? 

  } catch (error) {
    console.error("Error verifying cart", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}

export const verifyCartInternal = async (userId: string, cartId: number) => {
  try {

    if (!userId && !cartId) {
      return parseServerActionResponse({
        status: "ERROR",    
        error: "Unauthorized request"
      })
    }


    if (!userId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      })
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { id: cartId,
          userId: userId,
         },
        include: { items: { include: { variant: true } } },
      });
  
      if (!cart) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Cart not found"
        })
      }
      const cartItems = cart.items;
  
      if (cartItems.length === 0) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Cart is empty"
        })
      }
  
      const variantIds = cartItems.map((item) => item.variantId);
      const existingVariants = new Set<string>();
      const variants = await tx.variant.findMany({
        where: { id: { in: variantIds } },
        select: { id: true, stockQuantity: true }
      })

      for (const variant of variants) {
        existingVariants.add(variant.id);
      }

      const missingVariants = variantIds.filter((id) => !existingVariants.has(id));
      if (missingVariants.length > 0) {
        return parseServerActionResponse({
          status: "ERROR",
          error: `Missing variants: ${missingVariants.join(", ")}`
        })
      }

      for (const item of cartItems) {
        const variant = variants.find((v) => v.id === item.variantId);
        if (!variant) {
          return parseServerActionResponse({
            status: "ERROR",
            error: `Missing variant: ${item.variantId}`
          })
        }

        if (variant.stockQuantity < item.quantity) {
          return parseServerActionResponse({
            status: "ERROR",
            error: `Insufficient stock for variant: ${item.variantId}`
          })
        }  
      }

      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: { cart: cart },
      })
    });

    if (transaction.status === "ERROR") {
      return parseServerActionResponse({
        status: "ERROR",
        error: transaction.error
      })
    }

    const cart = transaction.data.cart;
    if (!cart) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to verify cart"
      })
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      cart: cart,   
    })

    // check if this is a good validation for the cart? 

  } catch (error) {
    console.error("Error verifying cart", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}

 //==== SHIPPING OPTIONS =====
 const getShippingOptions = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 0, currency: 'usd' }, // $0
      display_name: 'Free Shipping',
      id: 'free',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 7 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 999, currency: 'usd' }, // $9.99
      display_name: 'Standard Shipping',
      id: 'standard',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 7 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1299, currency: 'usd' }, // $0
      display_name: 'Express Shipping',
      id: 'express',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 2 },
        maximum: { unit: 'business_day', value: 5 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1999, currency: 'usd' }, // $19.99
      display_name: 'Overnight Shipping',
      id: 'overnight',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 2 },
      },
    },
  },
];



// NEED TO STILL CREAT A STRIPE USER AFTER AUTH LOGIN

// ===== PROFESSIONAL CHECKOUT FUNCTION =====
export const initiateCheckout = async (userId: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!userIdSanitized) {
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

    const { success } = await rateLimiter.limit(`${userIdSanitized}:initiateCheckout`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        },
        appliedPromoCode: true,
        shippingAddress: true,
        user: true
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Ensure user has Stripe customer
    let stripeCustomerId = cart.user?.stripeCustomerId;
    if (!stripeCustomerId && cart.user) {
      const result = await createStripeCustomerForUser(cart.user);
      if (result.status === "ERROR") {
        return parseServerActionResponse({
          status: "ERROR",
          error: result.error
        })
      }
      stripeCustomerId = result.data.stripeCustomerId;
    }



    // Create line items for Stripe
    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.variant.product.title || 'Product',
          description: `${item.variant.size} - ${item.variant.color} - ${item.variant.product.description || ''}`,
          metadata: {
            productId: item.variant.product.id,
            productTitle: item.variant.product.title,
            variantId: item.variant.id,
            images: Array.isArray(item.variant.product.images) ? JSON.stringify(item.variant.product.images[0]) : JSON.stringify(item.variant.product.images).slice(0, 200),
            size: item.variant.size,
            color: item.variant.color,
            sku: item.variant.sku,
          }
        },
        unit_amount: Math.round(item.variant.product.price || 0), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      ui_mode: 'embedded',
      line_items: lineItems,
      customer: stripeCustomerId || undefined,
      customer_creation: stripeCustomerId ? undefined : 'always',

      phone_number_collection: {
        enabled: true,
      },

      // now stripe will save the address and shipping method to the customer object
      customer_update: {
        address: 'auto',
        shipping: 'auto',
      },

      shipping_address_collection: {
        allowed_countries: ['US'],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 999, currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1299, currency: 'usd' },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1999, currency: 'usd' },
            display_name: 'Overnight Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },  
            },
          },
        },
      ],
      // Let Stripe handle tax calculation
      automatic_tax: { enabled: true },
      
      return_url: `${process.env.APP_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      
      metadata: {
        cartId: cart.id.toString(),
        userId: userId,
        userName: cart.user?.name || "",
        userEmail: cart.user?.email || "",
        hasExistingCustomer: stripeCustomerId ? "true" : "false",
        appliedPromoCode: cart.appliedPromoCode?.code || "",
        promoDiscountAmount: cart.promoDiscountAmount || 0,
      },
    });

    // Update cart with checkout session
    const updateCartWithCheckoutSession = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        checkoutStatus: 'in_progress',
      }
    });
    if (!updateCartWithCheckoutSession) {
      console.error("Failed to update cart with checkout session");
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to update cart with checkout session"
      })
    }

    return {
      status: 'SUCCESS',
      error: "",
      clientSecret: stripeSession.client_secret,
      successUrl: stripeSession.success_url,
      cancelUrl: stripeSession.cancel_url,
      sessionId: stripeSession.id,
    };

  } catch (error) {
    console.error('Checkout initiation failed:', error);
    return {
      status: 'ERROR',
      error: (error as Error).message,
    };
  }
};

export const calculateShippingCost = async (shippingMethod: string) => {
  const shippingCost = getShippingOptions.find(option => option.shipping_rate_data.id === shippingMethod)?.shipping_rate_data.fixed_amount.amount;
  return shippingCost;
};

export const setShippingMethod = async (userId: string, shippingMethod: string, temp_cartId: string | null) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

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
    const { success } = await rateLimiter.limit(`${userIdSanitized}:setShippingMethod`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }
    const findCartBy = userIdSanitized ? { userId: userIdSanitized } : { tempCartId: temp_cartId || "" };


    const update = await prisma.cart.update({
      where: {
        ...findCartBy,
      },
      data: {
        shippingMethod: shippingMethod,
      }
    })

    if (!update) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to update cart"
      })
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: { cart: update },
    })
  } catch (error) {
    console.error("Error setting shipping method", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })
  }
}

/* 
KEY IMPROVEMENTS:

1. **No Stale Data**: Removed snapshot fields from Cart model
   - Totals calculated fresh each time
   - No issues with outdated tax/shipping when items change

2. **Stripe Customer Integration**: 
   - Automatically create/reuse Stripe customers
   - Store customer ID for future purchases
   - Better checkout experience for returning customers

3. **Real-time Calculations**:
   - calculateCartTotals() function for fresh calculations
   - Only calculate tax when shipping address is available
   - Handles promo codes, shipping, tax dynamically

4. **Better Data Model**:
   - Address model for reusable shipping addresses
   - Order model with proper snapshots (only after purchase)
   - Checkout session tracking for debugging

5. **Professional Checkout Flow**:
   - Validate cart before checkout
   - Ensure Stripe customer exists
   - Let Stripe handle tax calculation (more accurate)
   - Proper error handling

This approach eliminates stale data issues while maintaining 
professional checkout functionality!
*/

export const fetchOrderDetails = async (userId: string, stripeSessionId: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!userIdSanitized) {
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

    if (!stripeSessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No stripe session id"
      })
    }

    const { success } = await rateLimiter.limit(`${userIdSanitized}:fetchOrderDetails`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      })
    }

    let order = await prisma.order.findFirst({
      where: {
        stripeSessionId: stripeSessionId,
      },
      include: {
        items: true,
      }
    })

    if (!order) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Order not found"
      })
    }

    /* =============================== Backup code for stripe session retrieval =============================== */
    // const sessionResult = await stripe.checkout.sessions.retrieve(stripeSessionId, {
    //   expand: ['line_items', 'customer']
    // })

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: {
        orderDate: order.createdAt,
        orderTotal: order.subtotal,
        orderStatus: order.status,
        orderItems: order.items,
        orderShipping: order.shippingMethod,
        orderShippingAddress: order.shippingAddress,
        orderTaxAmount: order.taxAmount,
      }
    })

    } catch (error) {
    console.error("Error fetching order details", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Internal server error"
    })  
  }
}




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
        discountAmount: cart.promoDiscountAmount ?? 0
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


export const checkZipCode = async (userId: string, zipCode: string) => {
  try {
    const request = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    if (!request.ok) {
      console.warn("Failed to fetch zip code");
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to fetch zip code"
      })
    }
    const data = await request.json();

    if (data.status !== "OK") {
      console.warn("Failed to fetch zip code");
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to fetch zip code"
      })
    }

    return parseServerActionResponse({
      data: data,
      status: "SUCCESS",
      error: "",
    })

  } catch (error) {
    console.error("Error checking zip code", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to check zip code"
    })
  }
}


export const estimateTaxForZipCode = async (userId: string, zipCode: string, taxLineItems: TaxLineItemType[], shippingCost: number) => {
  try {
    const session = await auth()
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!zipCode) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No zipCode provided"
      })
    }

    if (userIdSanitized) {
      const {success} = await clientRateLimiter.limit(`${userIdSanitized}:checkZipCode`);
      if (!success) {
        console.warn("Rate limit exceeded. Please try again later");
        return parseServerActionResponse({
          status: "ERROR",
          error: "Rate limit exceeded. Please try again later"
        })
      }
      if (sessionId !== userIdSanitized) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Unauthorized request"
        })
      }
    } else {
      const {success} = await clientRateLimiter.limit(`checkZipCode:${zipCode}`);
      if (!success) {
        console.warn("Rate limit exceeded. Please try again later");
        return parseServerActionResponse({
          status: "ERROR",
          error: "Rate limit exceeded. Please try again later"
        })
    }
  }

  const placeData = await checkZipCode(userId, zipCode);
    if (placeData.status === "ERROR") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to fetch zip code"
      });
    }
    
    const addressParts = placeData.data.results[0].formatted_address.split(',');
    if (addressParts.length < 2) {
      return { status: "ERROR", error: "Invalid address format" };
    }
    
    const city = addressParts[0];
    const stateAndZip = addressParts[1].trim().split(' ');
    const state = stateAndZip[0];
    const postalCode = stateAndZip[1];

    // Ensure shipping cost is in cents
    const shippingCostCents = Math.round(shippingCost * 100);
  
    const taxCalculation = await stripe.tax.calculations.create({
      currency: "usd",
      line_items: taxLineItems as any,
      tax_date: Math.floor(Date.now() / 1000),
      shipping_cost: shippingCostCents > 0 ? {
        amount: shippingCostCents,
        tax_behavior: "exclusive",
      } : undefined,
      customer_details: {
        address: {
          city: city,
          state: state,
          postal_code: postalCode,
          country: "US",
        },
        address_source: "shipping", // Add this
      },
      // Add expand to get more details
    });

    return parseServerActionResponse({       
      status: "SUCCESS",
      error: "",
      calculation: taxCalculation,
      totalTax: taxCalculation.tax_amount_exclusive,
      totalAmount: taxCalculation.amount_total,
    })

  } catch (error) {
    console.error("Tax calculation error:", error);
    return {
      status: "ERROR",
      error: (error as Error).message || "Failed to calculate tax",
    };
  }
};

export const getCartForCheckout = async (userId: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);
    
    if (!userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid user ID"
      });
    }

    if (sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId: userIdSanitized,
      },
      select: {
        id: true,
        items: {
          select: {
            id: true,
            quantity: true,
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                sku: true,
                product: {
                  select: {
                    id: true,
                    title: true,
                    price: true
                  }
                }
              }
            }
          }
        },
        promoDiscountAmount: true,
        requiresPromoVerification: true,
        shippingMethod: true,
      }
    });

    if (!cart) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No cart found"
      });
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: {
        cartId: cart.id,
        shippingMethod: cart.shippingMethod,
        items: cart.items as CartItemForCheckoutType[],
        promoDiscountAmount: cart.promoDiscountAmount,
        requiresPromoVerification: cart.requiresPromoVerification,
      }
    })
  } catch (error) {
    console.error("Error getting simple cart ID:", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to get simple cart ID"
    });
  }
  
  
}

export const fetchLastCompleteOrder = async (userId: string, stripeSessionId: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid user ID"
      });
    }

    if (sessionId && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      });
    }

    if (!stripeSessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No stripe session ID provided"
      });
    }

    const lastStripeSession = await prisma.order.findFirst({
      where: {
        stripeSessionId: stripeSessionId,
      },
      select: {
        id: true,
        paymentIntentId: true,
        status: true,
        amountTotal: true,
        createdAt: true,
        promoCodeUsed: true,
        promoDiscount: true,
        promoCodeId: true,
        promoUsages: true,
        address: true,
        firstName: true,
        lastName: true,
        taxAmount: true,
        trackingCode: true,
        trackingNumber: true,
        trackingUrl: true,
        labelUrl: true,
        deliveryDate: true,
        deliveryDays: true,
        shippingCost: true,
        carrier: true,
        items: {
          select: {
            productTitle: true,
            productId: true,
            variantSize: true,
            variantColor: true,
            quantity: true,
            unitPrice: true,
            images: true,
          }
        }
      }
    });

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: {
        stripeSession: lastStripeSession,
      }
    })

  } catch (error) {
    console.error("Error fetching last order:", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to fetch last order"
    });
  }
}


export const initiateRefund = async (userId: string, paymentIntentId: string, stripeSessionId: string, redirectPath: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid user ID"
      });
    }

    if (sessionId && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      });
    }

    if (!paymentIntentId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No payment intent ID provided"
      });
    }

    if (!stripeSessionId) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No stripe session ID provided"
      });
    }

    if (!redirectPath) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No redirect path provided"
      });
    }

    // Rate limiting
    const { success } = await rateLimiter.limit(`${userIdSanitized}:initiateRefund`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      });
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { stripeSessionId },
      select: {
        id: true,
        status: true,
        orderEmail: true,
        firstName: true,
        lastName: true,
        amountTotal: true,
        currency: true,
        createdAt: true,
        items: {
          select: {
            productTitle: true,
            productId: true,
            variantSize: true,
            variantColor: true,
            variantId: true,
            quantity: true,
            unitPrice: true,
            images: true,
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      }
    });

    if (!order) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Order not found"
      });
    }

    // Verify user owns the order
    if (order.user?.id !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      });
    }

    // Check if already refunded
    if (order.status === "refunded") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Order already refunded"
      });
    }

    // Business day constraint (e.g., 7 business days for test mode)
    const refundWindowDays = process.env.NODE_ENV === 'production' ? 30 : 7; // Shorter window for testing
    const orderAge = Math.floor((Date.now() - order.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (orderAge > refundWindowDays) {
      return parseServerActionResponse({
        status: "ERROR",
        error: `Refund period has expired (${refundWindowDays} days from purchase)`
      });
    }

    // Since it's test mode - always allow full refund within the time window
    const isTestMode = process.env.EASYPOST_TEST_MODE === "true";
    
    // Process Stripe refund (this works in both test and live mode)
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: 'requested_by_customer',
      metadata: {
        order_id: order.id,
        test_mode: isTestMode.toString()
      }
    });

    if (!refund) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to initiate refund"
      });
    }

    // Update order status
    const updateOrder = await prisma.order.update({
      where: { stripeSessionId },
      data: {
        status: "refunded",
        updatedAt: new Date(),
        refundedAt: new Date(),
        refundReason: 'customer_request'
      }
    });

    if (!updateOrder) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to update order"
      });
    }

    const updateMySQLQuantities = await Promise.all(
      order.items.map(async (item) => {
        return prisma.variant.update({
          where: {
            id: item.variantId
          },
          data: {
            stockQuantity: {
              increment: item.quantity // Positive number to add back to stock
            }
          }
        });
      })
    );

    if (!updateMySQLQuantities) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to update MySQL quantities"
      });
    }

    const updateSanityQuantities = await Promise.all(
      order.items.map(async (item) => {
        // Find the product that contains this variant
        const product = await writeClient.withConfig({useCdn: false}).fetch(
          `*[_type=="product" && _id == $productId][0]{
              _id,
              "variants": variants[]{
                _key,
                size,
                quantity,
                "colorRef": color._ref,
                "colorName": color->name
              }
            }`,
          { productId: item.productId }
        );
    
        if (!product) {
          throw new Error(`Product not found for variant ${item.variantId}`);
        }
    
        // Find the specific variant index
        const variantIndex = product.variants.findIndex(
          (v: any) => v._key === item.variantId
        );
    
        if (variantIndex === -1) {
          throw new Error(`Variant ${item.variantId} not found in product`);
        }
    
        // Update the specific variant's quantity
        return writeClient
          .patch(product._id)
          .set({
            [`variants[${variantIndex}].quantity`]: product.variants[variantIndex].quantity + item.quantity
          })
          .commit();
      })
    );

    if (!updateSanityQuantities) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to update Sanity quantities"
      });
    }

    if (!updateSanityQuantities) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to update Sanity quantities"
      });
    }

    const refundEmail = await sendRefundEmail(order, refund, "CUSTOMER_REQUEST");
    if (refundEmail.status === "ERROR") {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to send refund email"
      });
    }

    revalidatePath(redirectPath);

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: { 
        refund,
        message: isTestMode 
          ? "Test refund processed successfully" 
          : "Refund processed successfully"
      }
    });

  } catch (error) {
    console.error("Error processing refund:", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to process refund"
    });
  }
};


export const getAllOrders = async (userId: string) => {
  try {
    const session = await auth();
    const sessionId = session?.user?.id;
    const userIdSanitized = sanitizeSanityId(userId);

    if (!userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Invalid user ID"
      });
    }

    if (sessionId && sessionId !== userIdSanitized) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Unauthorized request"
      });
    }
    const {success} = await rateLimiter.limit(`${userIdSanitized}:getAllOrders`);
    if (!success) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Too many requests. Please try again later"
      });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: userIdSanitized,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        status: true,
        paymentIntentId: true,
        stripeSessionId: true,
        orderEmail: true,
        firstName: true,
        lastName: true,
        amountTotal: true,
        taxAmount: true,
        currency: true,
        createdAt: true,
        trackingCode: true,
        trackingNumber: true,
        trackingUrl: true,
        labelUrl: true,
        deliveryDate: true,
        deliveryDays: true,
        shippingCost: true,
        carrier: true,
        address: {
          select: {
            line1: true,
            line2: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
          }
        },
        items: {
          select: {
            productTitle: true,
            variantSize: true,
            variantColor: true,
            quantity: true,
            unitPrice: true,
            images: true,
            productId: true,
          }
        }
      }
    });

    if (!orders) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "No orders found"
      });
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: {
        orders,
      }
    });

    } catch (error) {
    console.error("Error fetching all orders:", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to fetch all orders"
    });
  }
}
