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
   //const user = await currentUser();
   const session = await auth();
   console.log("Session", session);
   const user = session?.user;
   console.log("User", user);
   /*if (!session) {
    console.error("User not authenticated");
    redirect("/sign-in");
   }*/
   const userId = user?.id;
   const userDoc = `user-${userId}`

    if (!hearted) {
      try {
      console.log("Unsetting the heart");
      await writeClient.withConfig({useCdn: false})
      .patch(userDoc)
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
                .patch(userDoc)
                .setIfMissing({heartedProducts: []})
                .append("heartedProducts", [newProductReference])
                .commit();
        }
         catch (error) {
            console.error("Error removing the heart", error);
        }
    }
  };

