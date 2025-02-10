"use client";
import { useContext } from "react";
import { Square, Check } from "lucide-react";
import { Context } from "@/app/context/context";

const CheckBox = ({ options }: { options: string }) => {
  const { checkedFilters, setCheckedFilters } = useContext(Context);
  const handleClick = () => {

    setCheckedFilters((prev) => ({
      ...prev,
      [options]: prev[options] !== undefined ? !prev[options] : true, // ✅ Ensure it starts with a valid boolean
    }));

  };
  return (
    <div className="flex flex-col ">
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
    </div>
  );
};

export default CheckBox;
