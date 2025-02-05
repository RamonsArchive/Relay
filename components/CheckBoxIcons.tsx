"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Square, Check } from "lucide-react";
import { FilterContext } from "@/app/(src)/layout";

const CheckBoxIcons = ({ options }: { options: string }) => {
  const { checkedFilters, setCheckedFilters } = useContext(FilterContext);
  const handleClick = () => {
    console.log(
      `Before Toggle - checkedFilters: ${JSON.stringify(checkedFilters, null, 2)}`
    );

    setCheckedFilters((prev) => ({
      ...prev,
      [options]: prev[options] !== undefined ? !prev[options] : true, // ✅ Ensure it starts with a valid boolean
    }));

    console.log(
      `After Toggle - checkedFilters: ${JSON.stringify(checkedFilters, null, 2)}`
    );
  };
  return (
    <Square
      className="cursor-pointer "
      size="20px"
      onClick={() => {
        handleClick();
      }}
    >
      {checkedFilters[options] && <Check className="h-4 w-4" />}
    </Square>
  );
};

export default CheckBoxIcons;
