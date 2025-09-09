"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { SideBarCardSkeleton } from "./SideBarSkeleton";

const SidebarWrapper = () => {
  const path = usePathname();
  const noSideBarPage =
    path?.startsWith("/product/") || path?.startsWith("/writeReview/") || path?.startsWith("/cart") || path?.startsWith("/checkout");
  const [isNoSideBarPage, setIsNoSideBarPage] = useState(noSideBarPage);


  useEffect(() => {
    setIsNoSideBarPage(noSideBarPage);
  }, [path]);

  return (
    <div className={`${isNoSideBarPage ? "w-0 hidden opacity-0" : "side-bar"}`}>
      <Suspense fallback={<SideBarCardSkeleton />}>
      <Sidebar />
      </Suspense>
    </div>
  );
};

export default SidebarWrapper;
