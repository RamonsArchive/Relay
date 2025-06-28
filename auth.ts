"server only";
import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import { writeClient } from "@/sanity/lib/write-client"
import { parseServerActionResponse } from "@/lib/utils";
import { AdapterUser } from "next-auth/adapters";
import { uploadImageStringToSanity } from "./sanity/lib/actions";
import { client } from "./sanity/lib/client";
import { prisma } from "./lib/prisma";
import { NextResponse } from "next/server";

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
            const sanityImageId = await uploadImageStringToSanity(user.image as string, profile.sub);
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
            provider: account!.provider,
          }); 


          // 2) Upsert into MySQL via Prisma

        try {
          await prisma.user.upsert({
            where: { id: userId },
            update: {
              email:    user.email || '',
              name:     user.name,
              provider:     account!.provider,
              updatedAt:    new Date(),
            },
            create: {
              id:        userId,
              email:     user.email || '',
              name:      user.name,
              provider:  account!.provider,
              // createdAt and isActive use their defaults
          },
        }) 

        const response = NextResponse.next();
        response.cookies.set('needs_cart_sync', 'true', {
          httpOnly: false, // Allow client-side access
          maxAge: 60 * 5, // 5 minutes
          path: '/'
        });
      }
        
       catch (error) {
        console.error("Error upserting user into MySQL", error);
        return false; // block sign in
        }
      }

        return true; // allow sign in
      } catch (error) {
        console.error("Error during signIn callback", error);
        console.error(parseServerActionResponse({status: "ERROR", error: "INTERNAL SERVER ERROR"}));
        return false; // block sign
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
