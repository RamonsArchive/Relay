"use client";
import React from "react";
import { handleSignIn } from "@/lib/serverActions";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <main className="flex fixed top-0 left-0 w-full h-full justify-center items-center bg-white-300">
      <div className="flex flex-col max-w-[400px] max-h-[550px] w-[80%] h-[80%] font-plex-sans border border-gray-300 shadow-lg items-center gap-10 ">
        <div className="flex flex-col gap-5 py-[25%] w-full items-center">
          <Link href="/">
            <Image
              src="/assets/logo/logo-png.png"
              alt="Brand Logo"
              width={130}
              height={100}
            />
          </Link>
          <p className="font-plex-sans font-medium text-[20px] text-black">
            Please sign in to continue
          </p>
          <form
            action={() => handleSignIn(callbackUrl)}
            className="sign-in-button bg-primary-200 text-white w-full"
          >
            <button type="submit" className="w-full h-full">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
