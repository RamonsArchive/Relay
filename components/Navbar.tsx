import React from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { auth } from "@/auth";
import ManageSession from "./ManageSession";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-3 py-3 bg-white-300 shadow-sm text-color-primary-200">
      <nav className="flex flex-row gap-4 items-center">
        <div className="flex flex-1 flex-col">
          <Link href="/" className="">
            <Image
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={60}
              height={40}
            />
          </Link>

          <div className="mt-2 ml-2 font-plex-sans font-light text-[10px]">
            <Image
              src={"/assets/icons/palestine.svg"}
              alt="Free Palestine"
              width={30}
              height={16}
              className="relative group group-border glow-border"
            />
            <span className=" ">Relay stands with Palestine</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col jusitfy-center items-center gap-y-4 mt-5 flex-nowrap font-semibold text-xl">
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
            <Link href="/collections/hearted" className="hover-grow-color">
              <span>Hearted</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-10">
          <div className="flex justify-self-end self-end pr-1">
            <ManageSession session={session} />
          </div>
          <div className="flex justify-self-end self-end">
            <Searchbar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
