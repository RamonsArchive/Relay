"use client";
import {
  handleSignIn,
  handleSignOut,
  revalidateFlaggedReviews,
  revalidateHeartedProducts,
} from "@/lib/serverActions";
import React, { useActionState } from "react";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation";
import Loader from "./Loader";
import { parseServerActionResponse } from "@/lib/utils";
import { Session } from "next-auth";
import { User } from 'lucide-react';

const ManageSession = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const isSession = user != null;

  const searchParams = useSearchParams();
  const pathName = usePathname();

  const query = searchParams.get("query") || "";
  const filters = searchParams.get("f") || "";

  const fullPath = pathName;
  // Construct the base URL
  let callbackUrl = fullPath;
  // Add query parameters if they exist
  const queryParams = new URLSearchParams();
  if (filters) queryParams.set("f", filters);
  if (query) queryParams.set("query", query);

  if (queryParams.toString()) {
    callbackUrl += `?${queryParams.toString()}`;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(isSession);

  const handleFormSubmit = async () => {
    try {
      if (isLoggedIn) {
        setIsLoggedIn(false);
        handleSignOut();
        revalidateFlaggedReviews();
        revalidateHeartedProducts();
      } else {
        setIsLoggedIn(true);
        handleSignIn(callbackUrl);
        revalidateFlaggedReviews();
        revalidateHeartedProducts();
      }
      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
      })
    } catch (error) {
      console.error("Failed to execute session action:", error);
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to execute session action",
      })
    }
  };

  const [_state, formAction, isPending] = useActionState(handleFormSubmit, {
    status: "INITIAL",
    error: "",
  });
  
  return (
    <>
    {isPending && (
        <div className="fixed top-0 left-0 w-full inset-0 h-full flex items-center justify-center bg-gray-100 bg-opacity-70 z-[999]">
          <Loader />
        </div>
      )}
      <div>
        {isLoggedIn ? (
          <form action={formAction}>
            <button
              type="submit"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer"
            >
              {user?.image ? <Image
                src={user?.image}
                alt={user?.name || "user name"}
                className="rounded-full object-cover"
                width={48}
                height={48}
              /> : <User className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
              
            </button>
          </form>
        ) : (
          <form action={formAction}>
            <button
              type="submit"
              className="font-plex-sans font-regular text-[16px] md:text-[18px]"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ManageSession;

/*
<form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>

*/
