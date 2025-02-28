"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import { fetchPopularCategories } from "./client";
import {fetchRecentSearches } from "./client";
import { categoriesType } from "@/globalTypes";


export const uploadImageToSanity = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, {responseType: "arraybuffer"}) as any;
    const imageBuffer = Buffer.from(response.data);

    const uploadImage = await writeClient.assets.upload("image", imageBuffer, {
      filename: `${nanoid()}.jpg`,
    })

    return uploadImage._id;
    
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  } 
}

export const handleHeartWrite = async (userId: string, productId: string, hearted: boolean) => {  
   const userIdString = userId;
   console.log("User ID: ", userIdString);
   console.log("User ID: ", userIdString);
   console.log("Product ID: ", productId);
   console.log("Type of prdouct id: ", typeof productId);
   if (!userIdString || !productId) {
    throw new Error("No user ID provided");
   }

   console.log("Hearted value: ", hearted);
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
      console.log("Tyep of updatedProducts: ", typeof updatedProducts);
      console.log("upadted Products: ", updatedProducts);
      updatedProducts = updatedProducts.filter((product: any) => product._ref !== productIdString);
      console.log("Unique Filters: ", updatedProducts);
      updatedProducts = [newProductReference, ...updatedProducts];
      

      console.log("Updated Products: ", updatedProducts);

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
    console.log("Dereferenced categories: ", dereferencedCategories);

    const popularCategories = await fetchPopularCategories(userId);
    let updatedPopularCategories = dereferencedCategories;
    updatedPopularCategories = [...dereferencedCategories, ...popularCategories];
    console.log("Updated popular categories: ", updatedPopularCategories);

    await writeClient
      .withConfig({useCdn: false})
      .patch(userId)
      .set({"popularCategories": updatedPopularCategories})
      .commit();
  } catch (error) {
    console.error("Error writing popular categories", error);
    return;
  }
} 


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
    console.log("New search: ", newSearch);

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

