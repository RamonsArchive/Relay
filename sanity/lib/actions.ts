"use server";
import axios from "axios"; // Import the 'axios' library
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import { redirect }  from "next/navigation";
import { auth } from "@/auth";


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

export const handleHeartWrite = async (productId: string, hearted: boolean) => {  
   const session = await auth();
   if (!session) {
    redirect("/sign-in?callbackUrl=/");
   }
   const user = session?.user;
   
   const userId = user?.id;
   const userIdString = userId?.toString() || "";

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
    };

  export const handleRecentyViewedProductsWrite = async (productId: string, userId: string, recentlyViewedProducts: any) => {
    console.log("recentlyViewedProducts: ", recentlyViewedProducts);
    console.log("type of recentlyViewedProducts: ", typeof recentlyViewedProducts);
    try {
      if (!userId) {
        throw new Error("No user ID provided");
      }
      const myKey = nanoid();

      const productIdString = productId.toString();

      const newProductReference = {
        _type: "reference",
        _ref: productIdString,
        _key: myKey,
      }

      let updatedProducts = recentlyViewedProducts.recentlyViewedProducts || []
      console.log("Tyep of updatedProducts: ", typeof updatedProducts);
      console.log("upadted Products: ", updatedProducts);
      updatedProducts = updatedProducts.filter((product: any) => product._ref !== productIdString);
      console.log("Unique Filters: ", updatedProducts);
      updatedProducts = [newProductReference, ...updatedProducts];
      updatedProducts = updatedProducts.slice(0, 10);
      

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

