"use server";
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import {HeartCollectionType } from "@/globalTypes";
import { redirect }  from "next/navigation";

export const handleHeartWrite = async (productId: string, hearted: boolean) => {   
   //const user = await currentUser();
   const user = "";
   if (!user) {
    console.error("User not authenticated");
    redirect("/sign-in");
   }
   const userId = ""

    if (!hearted) {
      try {
      console.log("Unsetting the heart");
      await writeClient.withConfig({useCdn: false})
      .patch(`user-${userId}`)
      .unset([`heartedProducts[_ref=="${productId}"]`])
      .commit();
    } catch (error) {
        console.error("Error setting the heart", error);
      }
    } else {
        try {
            const mykey = nanoid();
            console.log("My key", mykey);
            const newProductReference = {
                _type: "reference",
                _ref: productId,
                _key: mykey,
            }
            await writeClient
                .withConfig({useCdn: false})
                .patch(`user-${userId}`)
                .setIfMissing({heartedProducts: []})
                .append("heartedProducts", [newProductReference])
                .commit();
        }
         catch (error) {
            console.error("Error removing the heart", error);
        }
    }
  };

