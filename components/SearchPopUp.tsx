"use client"; // will use client to be able to close the popup once clicked outside or setclicked.

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Form from "next/form";
import { CircleX, X, Search } from "lucide-react";
import SearchBarReset from "./SearchBarReset";
import SearchBarServer from "./SearchBarServer";

// TODO: Implement RECENTS

interface Props {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  query?: string; // passed from page
}

const SearchPopUp = ({ query, setClicked }: Props) => {
  return (
    <main className="search-popup-container">
      <div className="grid grid-cols-3 items-center w-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={50}
              height={32}
            />
          </Link>
        </div>

        <div className="flex justify-center">
          <SearchBarServer query={query} />
        </div>
        <div className="flex justify-end mb-12">
          <CircleX
            size="34px"
            className="cursor-pointer"
            strokeWidth={1.3}
            onClick={() => setClicked(false)}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-2 gap-y-10 ml-[35%]">
        <div className="text-xl font-semibold self-start">Recents</div>
        <div className="text-xl font-semibold self-start">Popular Searches</div>
      </div>
    </main>
  );
};

export default SearchPopUp;
