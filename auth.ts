import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {writeClient} from "@/sanity/lib/write-client"
import { parseServerActionResponse } from "@/lib/utils";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({user, account}) {
      try {
        const userExists = await fetch(`*[_type == "user" && email == "${user.email}"][0] {
            email: email,
          }`);
          
         if (!userExists) {
          await writeClient.create({
            _type: "user",
            userId: user.id,
            email: user.email,
            firstName: user.name,
            image: user.image,
            provider: account?.provider,
          });
         }

         return true; // allow sign in
      } catch (error) {
        console.error(parseServerActionResponse({err: error, status: "ERROR"}));
        return false; // block sign
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token
    },
  
    async session({ session, token }) {
      session.user = token.user;
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
