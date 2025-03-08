import React from "react";

interface Props {
  label: string;
  subTitleOne: string;
  subTitleTwo: string;
  subTitleThree: string;
  value: number;
  type?: string;
}

const Slider = ({
  label,
  subTitleOne,
  subTitleTwo,
  subTitleThree,
  value,
  type = "default",
}: Props) => {
  return (
    <div className="flex flex-col w-full mb-2 gap-3">
      <p className="font-plex-sans font-medium text-[16px]">{label}</p>
      <div className="relative w-full bg-gray-300 h-3 rounded-md">
        <div
          className="absolute top-0 left-0 h-3 bg-blue-500 rounded-md"
          style={{ width: `${value * 100}%` }}
        ></div>
      </div>
      <div className="flex flex-row justify-between">
        <p className="font-plex-sans font-regular text-[12px]">{subTitleOne}</p>
        <p className="font-plex-sans font-regular text-[12px]">{subTitleTwo}</p>
        <p className="font-plex-sans font-regular text-[12px]">
          {subTitleThree}
        </p>
      </div>
    </div>
  );
};

export default Slider;
