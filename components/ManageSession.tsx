"use client";
import { signOut, signIn } from "next-auth/react";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Loader from "./Loader";
import { parseServerActionResponse } from "@/lib/utils";
import { Session } from "next-auth";
import { User, LogOut, ListChecks } from "lucide-react";
import Link from "next/link";

const ManageSession = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const isSession = user != null;
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const query = searchParams.get("query") || "";
  const filters = searchParams.get("f") || "";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRefInner = useRef<HTMLDivElement>(null);
  const dropDownRefOuter = useRef<HTMLButtonElement>(null);

  // Construct callback URL
  let callbackUrl = pathName;
  const queryParams = new URLSearchParams();
  if (filters) queryParams.set("f", filters);
  if (query) queryParams.set("query", query);
  if (queryParams.toString()) {
    callbackUrl += `?${queryParams.toString()}`;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const dropDownClicked = dropDownRefInner.current?.contains(
        event.target as Node
      );
      const dropDownOuterClicked = dropDownRefOuter.current?.contains(
        event.target as Node
      );

      if (!dropDownClicked && !dropDownOuterClicked) {
        setIsDropdownOpen(false);
      }
      if (!dropDownClicked && dropDownOuterClicked) {
        setIsDropdownOpen((prev) => !prev);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut({
      redirectTo: "/",
    });
  };

  const handleFormSubmit = async () => {
    try {
      if (isSession) {
        setIsDropdownOpen(true);
        // Don't manually call refreshBasketCount - let the state-based approach handle it
      } else {
        await signIn("google", {
          redirectTo: callbackUrl,
        });
      }

      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
      });
    } catch (error) {
      console.error("Failed to execute session action:", error);
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to execute session action",
      });
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
        {isSession ? (
          <div className="flex relative">
            <button
              ref={dropDownRefOuter}
              type="submit"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "user name"}
                  className="rounded-full object-cover w-full h-full"
                  width={48}
                  height={48}
                />
              ) : (
                <User className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />
              )}
            </button>
            <div
              ref={dropDownRefInner}
              className={`absolute top-full rounded-md right-0 w-40 xs:w-48 bg-slate-700 transition-all duration-300 ease-in-out ${isDropdownOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 hidden"}`}
            >
              <div className="flex flex-col w-full bg-slate-700 rounded-md shadow-md items-center">
                <button
                  className="flex flex-row gap-x-3 items-center text-white px-2 py-2 font-bold text-[12px] sm:text-[14px] md:text-[16px] rounded-md transition-all duration-300 ease-in-out hover:bg-slate-800 w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  Logout
                </button>
                <Link href="/orders" className="w-full">
                  <button className="flex flex-row gap-x-3 items-center text-white px-2 py-2 font-bold text-[12px] sm:text-[14px] md:text-[16px] rounded-md transition-all duration-300 ease-in-out hover:bg-slate-800 w-full">
                    <ListChecks className="w-4 h-4 md:w-5 md:h-5" />
                    Orders
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form action={formAction}>
            <button
              type="submit"
              className="font-plex-sans font-regular text-[16px] sm:text-[18px]"
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
