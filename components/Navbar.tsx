import React from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({ query }: { query?: string }) => {
  return (
    <header className="px-5 py-5 bg-white-300 shadow-sm text-color-primary-200">
      <nav className="flex flex-row gap-4 items-center">
        <div className="flex flex-1 flex-col">
          <Link href="/">
            <Image
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={50}
              height={32}
            />
          </Link>
        </div>

        <div className="flex flex-1 flex-col jusitfy-center items-center gap-y-4 mt-5 flex-nowrap font-semibold text-xl">
          <div className="flex gap-x-10 whitespace-nowrap">
            <Link className="hover-grow-color" href="/men">
              <span>Men</span>
            </Link>
            <Link href="/women" className="hover-grow-color">
              <span>Women</span>
            </Link>
            <Link href="/kids" className="hover-grow-color">
              <span>Kids</span>
            </Link>
            <Link href="/unisex" className="hover-grow-color">
              <span>Unisex</span>
            </Link>
          </div>
          <div className="flex gap-x-10 whitespace-nowrap">
            <Link href="/featured" className="hover-grow-color">
              <span>Featured</span>
            </Link>
            <Link href="/newreleases" className="hover-grow-color">
              <span>New Arrivals</span>
            </Link>
            <Link href="/sale" className="hover-grow-color">
              <span>Sale</span>
            </Link>
          </div>
        </div>
        <div className="flex-center flex-1 justify-center items-center flex-col gap-y-5">
          <div className="ml-auto">
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
            />
          </div>
          <div className="w-full flex justify-end mr-10">
            <Searchbar query={query} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

/* Might include a settings but stripe has address already locked.
  <Link href="/settings" className="hover-grow-color">
            <Image
              src="/assets/icons/settings.svg"
              alt="settings"
              width={32}
              height={32}
              style={{ stroke: "primary-200", strokeWidth: 10 }}
            />
          </Link>

*/
