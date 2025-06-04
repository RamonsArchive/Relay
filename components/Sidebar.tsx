"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import { Context } from "@/app/context/context";
import { ChevronDown, ChevronUp } from "lucide-react";
import MobileFilters from "./MobileFilters";
import { SlidersHorizontal } from "lucide-react";

const Sidebar = () => {
  const { filters, selectedFilters, toggleFilter, toggleCategory } =
    useContext(Context);
  const [mobileFiltersClicked, setMobileFiltersClicked] = useState(false);

  useEffect(() => {
    if (mobileFiltersClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersClicked]);

  return (
    <>
      <aside className="hidden sm:flex flex-col w-full h-full pb-20 gap-5 items-center pt-[4rem] md:pt-[0] scrollbar-hidden">
        <div className="flex items-center justify-center w-full py-3 sticky top-0 bg-white-300 z-50">
          <span className="font-plext-sans font-semibold items-center text-[22px]">
            Filters
          </span>
        </div>
        <div className="flex flex-col gap-5 pb-5 items-center w-full font-plex-sans font-medium text-[20px] scrollbar-hidden">
          {Object.entries(filters).map(
            ([category, { expanded, options }], index, arr) => (
              <div
                key={category}
                className={`side-bar-option-container ${index !== arr.length - 1 ? "border-b-[1px] pb-4 border-borderColor-100" : ""}`}
              >
                <button onClick={() => toggleCategory(category)}>
                  <div className="side-bar-options">
                    <span>
                      {category.slice(0, 1).toUpperCase() + category.slice(1)}
                    </span>

                    {expanded ? (
                      <ChevronUp size={24} className="cursor-pointer" />
                    ) : (
                      <ChevronDown size={24} className="cursor-pointer" />
                    )}
                  </div>
                </button>
                <div
                  className={`transform transition-all duration-300 ease-in-out scrollbar-hidden ${expanded ? "max-h-full" : "max-h-0 pointer-events-none overflow-hidden"}`}
                >
                  {options.map((option, index) => (
                    <CheckBox
                      expanded={expanded}
                      key={index}
                      option={option}
                      category={category}
                      onToggle={toggleFilter}
                      isChecked={selectedFilters[category]?.includes(option)}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </aside>

      <nav className="flex flex-row w-full mt-[4rem] items-center justify-end overflow-x-auto sm:hidden gap-5 pt-3 pr-3">
        <div className="flex items-center justify-center px-3 py-1 rounded-full bg-gray-500 shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out">
          <button
            onClick={() => setMobileFiltersClicked(!mobileFiltersClicked)}
            className="flex flex-row items-center justify-center gap-2 w-full h-full font-plex-sans font-semibold text-[16px] xs:text-[18px] text-white"
          >
            Filters
            <SlidersHorizontal className="size-[20px] xs:size-[22px] cursor-pointer text-white" />
          </button>
        </div>

        <Suspense fallback={<div>Filters...</div>}>
        <MobileFilters
          mobileFiltersClicked={mobileFiltersClicked}
          setMobileFiltersClicked={setMobileFiltersClicked}
        />
        </Suspense>
      </nav>
    </>
  );
};

export default Sidebar;
