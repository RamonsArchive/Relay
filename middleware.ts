export { auth as middleware } from "@/auth"
import { auth } from "@/auth"
import { NextResponse } from "next/server"


export default auth((req) => {
    if (!req.auth) {
      const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
      newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return Response.redirect(newUrl)
    }
    return NextResponse.next();
  }) 


  export const config = {
    matcher: ["/writeReview/:path*"],
  };
