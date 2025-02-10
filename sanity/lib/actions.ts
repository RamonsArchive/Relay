"use server";
import { writeClient } from "@/sanity/lib/write-client";
import { get } from "http";
//import { after } from "next/server";

const getHeartedCollectionId = async () => {
    const heartedCollection = await writeClient.fetch(`*[_type == "collections" && title == "hearted"][0]._id`);
    return heartedCollection;
}

const handleHeartWrite = async (productId: string, collections: Array<{_id: string, title: string}>, hearted: boolean) => {   
    console.log("Should hearted", hearted);
    console.log("Product ID", productId);
    console.log("Collections", collections);

    const getHeartedId = await getHeartedCollectionId();
    console.log("Hearted ID", getHeartedId);

    if (hearted) {
      try {
      await writeClient.withConfig({useCdn: false})
      .patch(productId)
      .unset([`collections[_ref=="${getHeartedId}"]`])
      .commit();
    } catch (error) {
        console.error("Error setting the heart", error);
      }
    } else {
        try {
            if (collections.length < 1) {
                await writeClient
                .withConfig({useCdn: false})
                .patch(productId)
                .setIfMissing({collections: []})
                .append("collections", [{_type: "reference", _ref: getHeartedId}])
                .commit();
            } else {
                await writeClient
                .withConfig({useCdn: false})
                .patch(productId)
                .append("collections", [{_type: "reference", _ref: getHeartedId}])
                .commit();
            }
        } catch (error) {
            console.error("Error removing the heart", error);
        }
    }
  };

export default handleHeartWrite;