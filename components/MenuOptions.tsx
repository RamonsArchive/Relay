"use client";
import { Menu, X } from "lucide-react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

const MenuOptions = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState(false);
  const path = usePathname();

  const prevPath = useRef(path);

  useEffect(() => {
    if (loader) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [loader]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loader) {
      // Set a timeout to hide the loader after 2 seconds (adjust as needed)
      timeout = setTimeout(() => {
        setLoader(false);
        setMenuOpen(false);
      }, 1500); // 2000ms = 2 seconds
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout); // Cleanup timeout
      }
    };
  }, [loader]);

  useEffect(() => {
    prevPath.current = path;
    let loaderClosed = false;
    if (path == prevPath.current) {
      loaderClosed = true;
      setLoader(false);
      setMenuOpen(false);
    }
    if (path && path !== prevPath.current) {
      loaderClosed = true;
      setLoader(false);
      setMenuOpen(false);
    }

    // for error handling
    if (!loaderClosed) {
      const timeout = setTimeout(() => {
        setLoader(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [path]);

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey); // Escape key support
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [menuOpen]);

  const handleLoader = () => {
    setLoader(true);
  };

  return (
    <div>
      {loader && (
        <div className="fixed top-0 left-0 w-full inset-0 h-full flex items-center justify-center bg-gray-100 bg-opacity-70 z-[999]">
          <Loader />
        </div>
      )}
      <button
        className="navbar-icon-compact"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <Menu className="size-[24px] sm:size-[28px] md:size-[32px]" />
      </button>

      <div
        ref={menuRef}
        className={`fixed flex flex-col top-0 right-0 w-[60vw] sm:w-[40vw] h-[100vh] p-3 bg-white-300 shadow-md shadow-third-300 z-[999] transform transition-all duration-300 ease-in-out scrollbar-hidden ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <div className="ml-auto cursor-pointer">
          <button className="p-1 flex items-center justify-center rounded-full hover:bg-gray-300 transition duration-200 ease-in-out">
            <X
              size="30px"
              className="cursor-pointer text-gray-600"
              strokeWidth={1}
              onClick={() => setMenuOpen(false)}
            />
          </button>
        </div>
        <div className="flex flex-col items-center gap-5 font-plex-sans font-medium text-[18px] sm:text-[22px]">
          <Link
            href="/gender/men"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Men</span>
          </Link>
          <Link
            href="/gender/women"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Women</span>
          </Link>
          <Link
            href="/kids"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Kids</span>
          </Link>
          <Link
            href="/gender/unisex"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Unisex</span>
          </Link>
        </div>
        <span className="border-b-[2px] w-[75%] mx-auto border-borderColor-100 mt-5 mb-5"></span>
        <div className="flex flex-col items-center gap-5 font-plex-sans font-medium text-[18px] sm:text-[22px]">
          <Link
            href="/collections/featured"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Featured</span>
          </Link>
          <Link
            href="/collections/newarrivals"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>New Arrivals</span>
          </Link>
          <Link
            href="/collections/sale"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Sale</span>
          </Link>
          <Link
            href="/collections/bestsellers"
            className="hover-grow-color"
            onClick={handleLoader}
          >
            <span>Best Sellers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

//

export default MenuOptions;
