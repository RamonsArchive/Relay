import React from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { auth } from "@/auth";
import ManageSession from "./ManageSession";
import { Heart } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import FloatingNavBar from "./FloatingNavBar";
import { RecentSearches } from "@/globalTypes";

const NavBarWrapper = ({
  session,
  recentSearches,
}: {
  session: Session | null;
  recentSearches: RecentSearches;
}) => {
  return (
    <header className="p-1 md:p-2 bg-white-300 max-h-[5rem] md:max-h-[8rem] h-[100%] border-b-[1px] border-borderColor-100 text-color-primary-200">
      <nav className="hidden md:flex md:flex-row md:gap-4 md:items-center">
        <div className="flex flex-1 flex-row items-center gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={60}
              height={60}
              className="w-18 h-23"
            />
          </Link>

          <div className="font-plex-sans font-light text-[10px] pt-10">
            <Image
              src={"/assets/icons/palestine.svg"}
              alt="Free Palestine"
              width={30}
              height={20}
              className="relative group group-border glow-border"
            />
            <span className="text-[12]">Relay stands with Palestine</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col jusitfy-center items-center gap-y-4 flex-nowrap font-semibold md:text-[20px]">
          <div className="flex gap-x-10 whitespace-nowrap">
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
          <div className="flex gap-x-10 whitespace-nowrap">
            <Link href="/collections/featured" className="hover-grow-color">
              <span>Featured</span>
            </Link>
            <Link href="/collections/newarrivals" className="hover-grow-color">
              <span>New Arrivals</span>
            </Link>
            <Link href="/collections/sale" className="hover-grow-color">
              <span>Sale</span>
            </Link>
            <Link href="/collections/bestsellers" className="hover-grow-color">
              <span>Best Sellers</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:gap-y-3">
          <div className="flex flex-row ml-auto gap-x-4 items-center">
            <Link href="/collections/hearted" className="hover-grow-color">
              <Heart className="w-6 h-6 md:w-8 sm:h-8" />
            </Link>
            <ShoppingBasket className="w-6 h-6 md:w-8 md:h-8" />
            <ManageSession session={session} />
          </div>
          <div className="flex justify-self-end self-end">
            <Searchbar session={session} recentSearches={recentSearches} />
          </div>
        </div>
      </nav>
      {/* Mobile Nav */}
      <div className="md:hidden">
        <FloatingNavBar session={session} recentSearches={recentSearches} />
      </div>
    </header>
  );
};

export default NavBarWrapper;
