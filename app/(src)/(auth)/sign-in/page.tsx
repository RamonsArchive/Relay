import React, { Suspense } from "react";
import Link from "next/link";
import SignInContent from "@/components/SignInContent";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const experimental_ppr = true;

const SignInPage = () => {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <main className="flex fixed top-0 left-0 w-full h-full justify-center items-center bg-white-300 overflow-y-hidden z-50 scrollbar-hidden">
        <div className="flex flex-col max-w-[400px] max-h-[550px] w-[80%] h-[80%] font-plex-sans border border-gray-300 shadow-lg items-center gap-10 ">
          <div className="flex flex-col gap-5 py-[25%] w-full items-center">
            <Link href="/">
              <img
                src="/assets/logo/logo-png.png"
                alt="Brand Logo"
                width={130}
                height={130}
              />
            </Link>
            <SignInContent />
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default SignInPage;
