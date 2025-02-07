"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import React from "react";

const SearchBarReset = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reset = () => {
    const form = document.querySelector(
      ".search-form-popup"
    ) as HTMLFormElement;
    if (form) {
      form.reset();
    }
    const newParams = new URLSearchParams(searchParams.toString());
    if (newParams.has("query")) {
      newParams.delete("query");
      router.replace(`/?${newParams.toString()}`);
    }
    // ✅ Updates URL without reloading
  };
  return (
    <X
      size="32px"
      strokeWidth={1.1}
      className="cursor-pointer"
      onClick={reset}
    />
  );
};

export default SearchBarReset;
