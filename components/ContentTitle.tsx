"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

const ContentTitle = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  let title: string | undefined;

  if (pathName !== "/") {
    title = pathName.split("/").filter(Boolean).pop() || "All Clothes";
    title =
      title === "newarrivals"
        ? "New Arrivals"
        : title === "bestsellers"
          ? "Best Sellers"
          : title;
    if (
      title !== "All Clothes" &&
      title !== "New Arrivals" &&
      title !== "Best Sellers"
    ) {
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
  } else {
    title = (searchParams.get("query") ?? undefined) || "";
    title = `Results for: ${title.charAt(0).toUpperCase() + title.slice(1)}`;
  }

  return (
    <p className="pl-5 mt-[0] sm:mt-[5rem] md:mt-[1rem] font-plex-sans font-semibold text-[24px] sm:text-[28px] md:text-[30px]">
      {title}
    </p>
  );
};

export default ContentTitle;
