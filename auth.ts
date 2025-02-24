"server only";
import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import { writeClient } from "@/sanity/lib/write-client"
import { parseServerActionResponse } from "@/lib/utils";
import { AdapterUser } from "next-auth/adapters";
import { uploadImageToSanity } from "./sanity/lib/actions";
import { client } from "./sanity/lib/client";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({user, account, profile}) {
      try {
        if (!profile?.sub) {
          console.error("No sub found in profile");
          return false; 
        }
        const userId = profile?.sub;
        const userExists = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        );
          
         if (!userExists) {
          let sanityImageRef = null;
          if (user.image) {
            const sanityImageId = await uploadImageToSanity(user.image as string);
            if (sanityImageId) {
              sanityImageRef = {
                _type: 'image',
                asset: {
                  _ref: sanityImageId,
                }
              }
            }
          }
          await writeClient.create({
            _type: "user",
            _id: userId,
            userId: userId,
            email: user.email,
            firstName: user.name,
            image: sanityImageRef,
            provider: account?.provider,
          });
         }

         const cookieStore = cookies();
         const heartedProductId = (await cookieStore).get("heartedProductId")?.value;
         const heartedAction = (await cookieStore).get("heartedAction")?.value;

         if (heartedProductId && heartedAction == "true") {
          // await handleHeartWrite(heartedProductId, true);
         }
         return true; // allow sign in
      } catch (error) {
        console.error(parseServerActionResponse({err: error, status: "ERROR"}));
        return false; // block sign
      } finally {
        cleanUpCookes();
      }
    },

    // maybe to preverve callback url?
    async redirect({url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return url;
    },

    async jwt({ token, user, profile }) {
      if (profile?.sub && !token.id) {
        token.id = profile.sub;
      }
      if (user) {
        token.user = user;
      }
      return token
    },
  
    async session({ session, token }) {
      session.user = token.user as AdapterUser & User;
      session.user.id = token.id as string;
      return session;
    },

    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    }, 

  },
  /*
  dont need custom login pages
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  }*/

})

const cleanUpCookes = async () => {
  const cookieStore = cookies();
  const heartedProductId = (await cookieStore).get("heartedProductId")?.value;
  const heartedAction = (await cookieStore).get("heartedAction")?.value;

  if (heartedProductId && heartedAction === "true") {
    (await cookieStore).delete("heartedProductId");
    (await cookieStore).delete("heartedAction");
  }
}
