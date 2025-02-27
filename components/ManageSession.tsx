"use client";
import { handleSignIn, handleSignOut } from "@/lib/serverActions";
import React, { useActionState } from "react";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation";

const ManageSession = ({ session }: { session: any }) => {
  const user = session?.user;
  const isSession = user != null;
  //console.log(user);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  //console.log(`pathName: ${pathName}`);

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
  //console.log(`Callback URL: ${callbackUrl}`);

  let userInfo = {};
  const [isLoggedIn, setIsLoggedIn] = useState(isSession);

  const handleFormSubmit = async () => {
    try {
      if (isLoggedIn) {
        setIsLoggedIn(false);
        handleSignOut();
      } else {
        setIsLoggedIn(true);
        handleSignIn(callbackUrl);
      }
      console.log(`Is still logged in ${user}`);
    } catch (error) {
      console.error("Failed to execute session action:", error);
      return;
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, null);
  return (
    <>
      <div>
        {isLoggedIn ? (
          <form action={formAction}>
            <button type="submit">
              <Image
                src={user?.image || ""}
                alt={user?.name}
                className="rounded-full w-11 h-11 object-cover"
                width={48}
                height={48}
              />
            </button>
          </form>
        ) : (
          <form action={formAction}>
            <button
              type="submit"
              className="font-plex-sans font-regular text-[18px]"
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
