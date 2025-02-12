"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Mobilebar from "./Mobilebar";

const SidebarWrapper = () => {
  const path = usePathname();
  console.log("Path", path);
  const productPage = path?.startsWith("/product/");
  console.log(`Product Page: ${productPage}`);
  const [isProductPage, setIsProductPage] = useState(productPage);

  useEffect(() => {
    const productPage = path?.startsWith("/product/");
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
