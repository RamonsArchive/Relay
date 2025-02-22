"use client";
import { Square, Check } from "lucide-react";

interface Props {
  option: string;
  category: string;
  isChecked: boolean;
  onToggle: (category: string, option: string) => void;
}

const CheckBox = ({ option, category, isChecked, onToggle }: Props) => {
  return (
    <button
      onClick={() => onToggle(category, option)}
      className="flex flex-row items-center gap-2 hover:text-gray-500 transition:colors duration-200 ease-in-out"
    >
      <div className="flex-shrink-0">
        <Square
          className="cursor-pointer font-plex-sans font-regular"
          size="20px"
        >
          {isChecked && <Check className="h-4 w-4" />}
        </Square>
      </div>
      <span className="font-plex-sans font-regular text-[18px] min-w-0 break-words">
        {option}
      </span>
    </button>
  );
};

export default CheckBox;

/*<div className="flex flex-col ">
      <div
        className="flex flex-row gap-2 items-start"
        onClick={() => {
          handleClick();
        }}
      >
        <div className="shrink-0">
          <Square className="cursor-pointer " size="20px">
            {checkedFilters[options] && <Check className="h-4 w-4" />}
          </Square>
        </div>
        <div className="flex-1 min-w-0 whitespace-normal break-words">
          <span>{options}</span>
        </div>
      </div>
    </div> */
