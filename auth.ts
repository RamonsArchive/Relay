"server only";
import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import { writeClient } from "@/sanity/lib/write-client"
import { parseServerActionResponse } from "@/lib/utils";
import { AdapterUser } from "next-auth/adapters";
import { uploadImageToSanity } from "./sanity/lib/actions";
import { client } from "./sanity/lib/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({user, account}) {
      try {
        const userExists = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        );

        //console.log("User exists", userExists.email);
          
        console.log("User exists", userExists);
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
            userId: user.id,
            email: user.email,
            firstName: user.name,
            image: sanityImageRef,
            provider: account?.provider,
          });
         }

         return true; // allow sign in
      } catch (error) {
        console.error(parseServerActionResponse({err: error, status: "ERROR"}));
        return false; // block sign
      }
    },

    // maybe to preverve callback url?
    async redirect({url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return url;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token
    },
  
    async session({ session, token }) {
      session.user = token.user as AdapterUser & User;
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
