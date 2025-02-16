"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Mobilebar from "./Mobilebar";

const SidebarWrapper = () => {
  const path = usePathname();
  const productPage =
    path?.startsWith("/product/") || path?.startsWith("/writeReview/");
  const [isProductPage, setIsProductPage] = useState(productPage);

  useEffect(() => {
    setIsProductPage(productPage);
  }, [path]);

  return (
    <div>
      {!isProductPage && (
        <>
          <Sidebar />
          <Mobilebar />
        </>
      )}
    </div>
  );
};

export default SidebarWrapper;
