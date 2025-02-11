"use server";
import { writeClient } from "@/sanity/lib/write-client"
import { nanoid } from "nanoid";
import {HeartCollectionType } from "@/globalTypes";
import { get } from "http";
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
        /*const mutation = [
            {
              patch: {
                id: productId,
                unset: [`collections[_ref == "${heartedCollectionId}"]`],
              },
            },
          ];
        await writeClient.mutate(mutation)*/

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
            /*if (collections.length < 1) {
                const mutation = [
                    {
                      patch: {
                        id: productId,
                        setIfMissing: { collections: [] },
                        append: {
                          collections: [{ _type: "reference", _ref: heartedCollectionId }],
                        },
                      },
                    },
                  ];
                  await writeClient.mutate(mutation);*/
                
            } 
            /*if (collections.length < 1) {
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
            } */
         catch (error) {
            console.error("Error removing the heart", error);
        }
    }
  };

export default handleHeartWrite;