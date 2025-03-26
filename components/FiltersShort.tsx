"use client";
import React from "react";
import { useContext } from "react";
import { Context } from "@/app/context/context";
import { X } from "lucide-react";

const FiltersShort = () => {
  const { selectedFilters, toggleFilter } =
    useContext(Context);

  const hasFilters = Object.values(selectedFilters).some(
    (filtersArray) => filtersArray.length > 0
  );

  return (
    <div
      className={`flex flex-row gap-2 w-full  overflow-x-auto scrollbar-hidden sm:hidden sm:max-h-0 ${hasFilters ? "pt-5 pb-2 pr-3 pl-3" : "p-0 max-h-0"}`}
    >
      {Object.entries(selectedFilters).map(([category, filters]) =>
        filters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(category, filter)}
            className="flex flex-row gap-1 font-plex-sans font-light text-[12px] xs:text-[14px] md:[text-16px] items-center justify-center bg-gray-300 text-gray-188 px-2 py-[0.25rem] rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            {filter}{" "}
            <X
              className="size-[14px] xs:size-[16px] sm:size-[18px]"
              strokeWidth={0.9}
            />
          </button>
        ))
      )}
    </div>
  );
};

export default FiltersShort;
