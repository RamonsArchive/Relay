import React, { Suspense } from "react";
import { auth } from "@/auth";
import NavBarWrapper from "./NavBarWrapper";
import { fetchRecentSearchesFew } from "@/lib/serverActions";

export const experimental_ppr = true;
const Navbar = async () => {
  const session = await auth();
  const userId = session?.user?.id || "";
  let initialSearches = [];
  if (userId) {
    initialSearches = await fetchRecentSearchesFew(userId);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBarWrapper session={session} initialSearches={initialSearches} />
    </Suspense>
  );
};

export default Navbar;
