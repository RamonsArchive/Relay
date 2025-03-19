import React, { Suspense } from "react";
import { auth } from "@/auth";
import NavBarWrapper from "./NavBarWrapper";
import { fetchRecentSearchesFew } from "@/sanity/lib/client";

export const experimental_ppr = true;

const Navbar = async () => {
  const session = await auth();
  const userId = session?.user?.id || "";
  let recentSearches = [];
  if (userId) {
    recentSearches = await fetchRecentSearchesFew(userId);
  }
  console.log("Recent searches", recentSearches);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBarWrapper session={session} recentSearches={recentSearches} />
    </Suspense>
  );
};

export default Navbar;
