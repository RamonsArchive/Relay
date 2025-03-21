"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

const NavBarHeart = () => {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const prevPath = useRef("");

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [loading]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      // Set a timeout to hide the loader after 2 seconds (adjust as needed)
      timeout = setTimeout(() => {
        setLoading(false);
      }, 1500); // 2000ms = 2 seconds
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout); // Cleanup timeout
      }
    };
  }, [loading]);

  useEffect(() => {
    setLoading(false);
    prevPath.current = path;
  }, [path]);

  const handleHeartClick = () => {
    setLoading(true);
  };
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full inset-0 h-full flex items-center justify-center bg-gray-100 bg-opacity-70 z-[999]">
          <Loader />
        </div>
      )}

      <div className="navbar-icon-compact">
        <Link href="/collections/hearted">
          <Heart
            className="size-[22px] sm:size-[25px] md:size-[30px]"
            onClick={handleHeartClick}
          />
        </Link>
      </div>
    </>
  );
};

export default NavBarHeart;
