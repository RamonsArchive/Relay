"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const ContentTitle = () => {
  const searchParams = useSearchParams();
  let title: string | undefined = searchParams.get("query") ?? undefined;
  const specialTitles = [
    "men, women, unisex, kids, featured",
    "newarrivals",
    "sale",
    "bestsellers",
  ];
  if (!title) {
    title = "All Clothes";
  } else if (specialTitles.includes(title.toLowerCase())) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  } else {
    title = `Search results for: ${title.charAt(0).toUpperCase() + title.slice(1)}`;
  }
  return <p className="font-plex-sans font-bold text-[35px]">{title}</p>;
};

export default ContentTitle;
