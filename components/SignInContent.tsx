"use client";
import React from 'react'
import { handleSignIn } from "@/lib/serverActions";
import { useSearchParams } from "next/navigation";

const SignInContent = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  return (
    <>
        <p className="font-plex-sans font-medium text-[16px] md:text-[20px] text-black">
            Please sign in to continue
          </p>
          <form
            action={() => handleSignIn(callbackUrl)}
            className="sign-in-button bg-primary-200 text-white font-plex-sans text-[16px] md:text-[20px] w-full"
          >
            <button type="submit" className="w-full h-full">
              Sign in
            </button>
        </form>
       
    </>
  )
}

export default SignInContent