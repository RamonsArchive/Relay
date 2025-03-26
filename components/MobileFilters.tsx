import React from "react";
import { useContext } from "react";
import { Context } from "@/app/context/context";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import CheckBox from "./CheckBox";

const MobileFilters = ({
  mobileFiltersClicked,
  setMobileFiltersClicked,
}: {
  mobileFiltersClicked: boolean;
  setMobileFiltersClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    filters,
    selectedFilters,
    toggleFilter,
    toggleCategory,
  } = useContext(Context);

  return (
    <div
      className={`flex flex-col fixed top-0 left-0 w-full h-full bg-white-300 p-3 gap-5 overflow-y-auto z-[999] transform transition-all duration-300 ease-in-out scrollbar-hidden ${mobileFiltersClicked ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="flex w-full items-center">
        <div className="flex items-center ml-auto p-1 rounded-full bg-gray-500 hover:bg-gray-400 transition duration-200 ease-in-out">
          <X
            size="30px"
            className="cursor-pointer text-white"
            strokeWidth={1}
            onClick={() => setMobileFiltersClicked(false)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 pl-7">
        <p className="font-plex-sans font-regular xs:text-[18px] sm:text-[22px]">
          Filter
        </p>
      </div>
      <div className="flex flex-col gap-5 pl-3 mt-3">
        {Object.entries(filters).map(
          ([category, { expanded, options }], index, arr) => (
            <div
              key={category}
              className={`flex flex-col w-full gap-2 px-4 ${index != arr.length - 1 ? "border-b-[1px] pb-4 border-borderColor-100" : ""}`}
            >
              <button
                className="flex w-full h-full"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex flex-row items-center w-full justify-between font-plex-sans xs:text-[18px] sm:text-[22px] font-semibold gap-x-2">
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
                className={`transform transition-all duration-300 ease-in-out scrollbar-hidden ${expanded ? "max-h-[500px]" : "max-h-0 pointer-events-none overflow-hidden"}`}
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
    </div>
  );
};

export default MobileFilters;
