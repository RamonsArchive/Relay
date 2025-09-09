"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import React from "react";

interface Props {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBarReset = ({ setInputValue }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reset = () => {
    setInputValue("");
    const newParams = new URLSearchParams(searchParams.toString());
    if (newParams.has("query")) {
      newParams.delete("query");
      router.replace(`/?${newParams.toString()}`);
    }
    // ✅ Updates URL without reloading
  };
  return (
    <X
      size="25px"
      strokeWidth={1.1}
      className="cursor-pointer"
      onClick={reset}
    />
  );
};

export default SearchBarReset;
