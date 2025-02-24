"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Mobilebar from "./Mobilebar";

const SidebarWrapper = () => {
  const path = usePathname();
  const noSideBarPage =
    path?.startsWith("/product/") || path?.startsWith("/writeReview/");
  const [isNoSideBarPage, setIsNoSideBarPage] = useState(noSideBarPage);

  useEffect(() => {
    setIsNoSideBarPage(noSideBarPage);
  }, [path]);

  return (
    <div>
      <div className={`${isNoSideBarPage ? "w-0 hidden" : "side-bar"}`}>
        <Sidebar />
      </div>
      <div>
        <Mobilebar />
      </div>
    </div>
  );
};

export default SidebarWrapper;
