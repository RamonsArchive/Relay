import React, { Suspense } from "react";
import { auth } from "@/auth";
import NavBarWrapper from "./NavBarWrapper";
import { fetchRecentSearchesFew } from "@/lib/serverActions";
import { cookies } from "next/headers";

export const experimental_ppr = true;
const Navbar = async () => {
  const session = await auth();
  const userId = session?.user?.id || "";
  const cookieJar = await cookies();
  const temp_cartId = cookieJar.get("temp_cartId")?.value;
  let initialSearches = [];
  if (userId) {
    initialSearches = await fetchRecentSearchesFew(userId);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBarWrapper session={session} initialSearches={initialSearches} temp_cartId={temp_cartId || ""} />
    </Suspense>
  );
};

export default Navbar;
