"use client";
import { useContext, useEffect } from "react";
import CheckBox from "./CheckBox";
import { Context } from "@/app/context/context";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const { filters, selectedFilters, toggleFilter, toggleCategory } =
    useContext(Context);

  return (
    <aside className="side-bar-container">
      <div className="flex items-center justify-center w-full py-3 sticky top-0 bg-white-300 z-2 ">
        <span className="font-plext-sans font-bold items-center text-[22px]">
          Filters
        </span>
      </div>
      <div className="flex flex-col gap-5 pb-5 items-center w-full font-plex-sans font-medium text-[20px]">
        {Object.entries(filters).map(
          ([category, { expanded, options }], index, arr) => (
            <div
              key={category}
              className={`side-bar-option-container ${index !== arr.length - 1 ? " border-b-[1px] pb-4 border-borderColor-100" : ""}`}
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

              {expanded &&
                options.map((option, index) => (
                  <CheckBox
                    key={index}
                    option={option}
                    category={category}
                    onToggle={toggleFilter}
                    isChecked={selectedFilters[category]?.includes(option)}
                  />
                ))}
            </div>
          )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
