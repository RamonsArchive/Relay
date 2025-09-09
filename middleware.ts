export { auth as middleware } from "@/auth"
import { auth } from "@/auth"
import { NextResponse } from "next/server"


export default auth((req) => {
    if (!req.auth) {
      const newUrl = new URL("/sign-in", req.nextUrl.origin);
      newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(newUrl)
    }

    return NextResponse.next();
  }) 


  export const config = {
    matcher: ["/writeReview/:path*", "/checkout", "/orders"],
  };
