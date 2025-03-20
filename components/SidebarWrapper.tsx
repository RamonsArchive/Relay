"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const SidebarWrapper = () => {
  const path = usePathname();
  const noSideBarPage =
    path?.startsWith("/product/") || path?.startsWith("/writeReview/");
  const [isNoSideBarPage, setIsNoSideBarPage] = useState(noSideBarPage);

  useEffect(() => {
    setIsNoSideBarPage(noSideBarPage);
  }, [path]);

  return (
    <div className={`${isNoSideBarPage ? "w-0 hidden opacity-0" : "side-bar"}`}>
      <Sidebar />
    </div>
  );
};

export default SidebarWrapper;
