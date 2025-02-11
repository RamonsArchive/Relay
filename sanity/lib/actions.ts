"use server";
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import {HeartCollectionType } from "@/globalTypes";
import { get } from "http";
import { revalidatePath } from "next/cache";
//import { after } from "next/server";

const getHeartedCollectionId = async () => {
    const heartedCollectionId = await writeClient.fetch(`*[_type == "collections" && title == "hearted"][0]._id`);
    return heartedCollectionId;
}



const handleHeartWrite = async (productId: string, collections: Array<{_id: string, _key: string, title: string}>, hearted: boolean) => {   
    console.log("Should hearted", hearted);
    console.log("Product ID", productId);
    console.log("Collections", collections);

    const heartedCollectionId = await getHeartedCollectionId();
    console.log("Hearted ID", heartedCollectionId);

    if (!hearted) {
      try {
      console.log("Unsetting the heart");
      await writeClient.withConfig({useCdn: false})
      .patch(productId)
      .unset([`collections[_ref=="${heartedCollectionId}"]`])
      .commit();
    } catch (error) {
        console.error("Error setting the heart", error);
      }
    } else {
        try {
            const mykey = nanoid();
            console.log("My key", mykey);
            const newCollectionReference = {
                _type: "reference",
                _ref: heartedCollectionId,
                _key: mykey,
            }
            await writeClient
                .withConfig({useCdn: false})
                .patch(productId)
                .setIfMissing({collections: []})
                .append("collections", [newCollectionReference])
                .commit();
        }
         catch (error) {
            console.error("Error removing the heart", error);
        }
    }

    revalidatePath("/"); // Home page
    revalidatePath("/collections"); // General collections page
    revalidatePath("/collections/hearted"); // Hearted collection page
    revalidatePath("/collections/newarrivals"); // New Arrivals
    revalidatePath("/collections/bestsellers"); // Best Sellers
    revalidatePath("/collections/sale"); // Best Sellers
    revalidatePath("/collections/featured"); // Best Sellers
    revalidatePath("/gender/men"); // Best Sellers
    revalidatePath("/gender/women"); // Best Sellers
    revalidatePath("/gender/unisex"); // Best Sellers
    revalidatePath("/kids"); // Best Sellers
  };

export default handleHeartWrite;