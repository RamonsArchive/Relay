import React from "react";
import { ChevronDown } from "lucide-react";

const Sidebar = () => {
  return (
    <main className="side-bar">
      <div className="side-bar-container">
        <span className="font-plext-sans font-bold items-center">Filters</span>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Gender</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>
          <div></div>
        </div>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Kids</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>

          <div></div>
        </div>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Size</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>

          <div></div>
        </div>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Cost</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>

          <div></div>
        </div>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Sale</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>

          <div></div>
        </div>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Color</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>

          <div></div>
        </div>
        <div className="flex flex-row w-full gap-2 px-4">
          <div className="flex flex-row items-center gap-x-2">
            <span>Brand</span>
            <ChevronDown
              className="cursor-pointer"
              size="20px"
              strokeWidth={2}
            />
          </div>

          <div></div>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default Sidebar;
