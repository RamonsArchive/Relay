"use client";
import { Suspense } from "react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import ManageSession from "./ManageSession";
import { Session } from "next-auth";
import FloatingNavBar from "./FloatingNavBar";
import { RecentSearches } from "@/globalTypes";
import { useState, useEffect, useRef } from "react";
import NavBarHeart from "./NavBarHeart";
import BasketButton from "./BasketButton";

const NavBarWrapper = ({
  session,
  initialSearches,
}: {
  session: Session | null;
  initialSearches: RecentSearches;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(isScrolled);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const navbarHeight = document.querySelector("header")?.offsetHeight || 0;
      const newScrollState = scrollTop > navbarHeight;
      if (newScrollState !== isScrolledRef.current) {
        setIsScrolled(newScrollState);
        isScrolledRef.current = newScrollState;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`hidden md:block p-1 md:p-2 bg-white-300 max-h-[5rem] md:max-h-[8rem] h-[100%] border-b-[1px] border-borderColor-100 text-color-primary-200 ${isScrolled ? "hidden" : ""}`}
      >
        <nav className="hidden md:flex md:flex-row md:gap-4 md:items-center">
          <div className="flex flex-1 flex-row items-center gap-8">
            <Link href="/" className="shrink-0 min-h-23">
              <img
                src="/assets/logo/logo-png.png"
                alt="logo"
                width={60}
                height={60}
                className="w-18 h-23"
              />
            </Link>

            <div className="flex flex-col gap-2">
              <Link
                href="https://amzn.to/3VkHiVK"
                className="usb-cable-gradient"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Buy good waffers</span>
              </Link>
              <div className="font-plex-sans font-light text-[10px] pt-2">
                <img
                  src={"/assets/icons/palestine.svg"}
                  alt="Free Palestine"
                  width={30}
                  height={20}
                  className="relative group group-border glow-border"
                />
                <span className="text-[12px]">Relay stands with Palestine</span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col jusitfy-center items-center gap-y-4 flex-nowrap font-medium md:text-[20px]">
            <div className="flex gap-x-8 whitespace-nowrap">
              <Link href="/gender/men" className="hover-grow-color">
                <span>Men</span>
              </Link>
              <Link href="/gender/women" className="hover-grow-color">
                <span>Women</span>
              </Link>
              <Link href="/kids" className="hover-grow-color">
                <span>Kids</span>
              </Link>
              <Link href="/gender/unisex" className="hover-grow-color">
                <span>Unisex</span>
              </Link>
            </div>
            <div className="flex gap-x-8 whitespace-nowrap">
              <Link href="/collections/featured" className="hover-grow-color">
                <span>Featured</span>
              </Link>
              <Link
                href="/collections/newarrivals"
                className="hover-grow-color"
              >
                <span>New Arrivals</span>
              </Link>
              <Link href="/collections/sale" className="hover-grow-color">
                <span>Sale</span>
              </Link>
              <Link
                href="/collections/bestsellers"
                className="hover-grow-color"
              >
                <span>Best Sellers</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 flex-col md:gap-y-3">
            <div className="flex flex-row ml-auto gap-x-1 items-center">
              <NavBarHeart />

              <Suspense fallback={<div> Loading... </div>}>
                <BasketButton />
              </Suspense>
              <div className="p-2">
                <Suspense fallback={<div> Profile </div>}>
                  <ManageSession session={session} />
                </Suspense>
              </div>
            </div>
            <div className="flex justify-self-end self-end">
              <Suspense fallback={<div> Search </div>}>
                <Searchbar
                  session={session}
                  initialSearches={initialSearches}
                />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
      <div className="md:hidden fixed top-0 h-[4rem] left-0 w-full bg-white-300 border-b-[1px] border-borderColor-100 text-color-primary-200 z-50">
        <Suspense fallback={<div> Search </div>}>
          <FloatingNavBar session={session} initialSearches={initialSearches} />
        </Suspense>
      </div>

      <header
        className={`hidden md:block h-[4rem] fixed top-0 left-0 w-full bg-white-300 border-b-[1px] border-borderColor-100 text-color-primary-200 z-50 transform transition-all ease-in-all duration-300 ${isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <Suspense fallback={<div> Search </div>}>
          <FloatingNavBar session={session} initialSearches={initialSearches} />
        </Suspense>
      </header>
    </>
  );
};

export default NavBarWrapper;
