"use client";
import React, { Suspense } from "react";
import { handleSignIn } from "@/lib/serverActions";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [fullCallbackUrl, setFullCallbackUrl] = useState(callbackUrl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullCallbackUrl(new URL(callbackUrl, window.location.origin).href);
    }
  }, [callbackUrl]);

  return (
    <main className="flex fixed top-0 left-0 w-full h-full justify-center items-center bg-white-300 overflow-y-hidden">
      <div className="flex flex-col max-w-[400px] max-h-[550px] w-[80%] h-[80%] font-plex-sans border border-gray-300 shadow-lg items-center gap-10 ">
        <div className="flex flex-col gap-5 py-[25%] w-full items-center">
          <Link href="/">
            <Image
              src="/assets/logo/logo-png.png"
              alt="Brand Logo"
              width={130}
              height={130}
            />
          </Link>

          <p className="font-plex-sans font-medium text-[16px] md:text-[20px] text-black">
            Please sign in to continue
          </p>
          <Suspense fallback={<div>Loading...</div>}>
          <form
            action={() => handleSignIn(fullCallbackUrl)}
            className="sign-in-button bg-primary-200 text-white font-plex-sans text-[16px] md:text-[20px] w-full"
          >
            <button type="submit" className="w-full h-full">
              Sign in
            </button>
          </form>
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
