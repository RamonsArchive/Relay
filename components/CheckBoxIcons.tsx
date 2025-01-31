"use client";
import React from "react";
import { useState } from "react";
import { Square, Check } from "lucide-react";

const CheckBoxIcons = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Square
      className="cursor-pointer "
      size="20px"
      onClick={() => {
        setChecked(!checked);
      }}
    >
      {checked && <Check className="h-4 w-4" />}
    </Square>
  );
};

export default CheckBoxIcons;
