"use client";
import { Square, Check } from "lucide-react";

interface Props {
  expanded?: boolean;
  option: string;
  category: string;
  isChecked: boolean;
  onToggle: (category: string, option: string) => void;
}

const CheckBox = ({
  expanded = false,
  option,
  category,
  isChecked,
  onToggle,
}: Props) => {
  return (
    <button
      onClick={() => onToggle(category, option)}
      className={`flex flex-row items-center gap-2 hover:text-gray-500 transform transition-all duration-200 ease scrollbar-hidden ${expanded ? "translate-y-0 opacity-100" : " -translate-y-full opacity-0"}`}
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
