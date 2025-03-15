import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { auth } from "@/auth";
import ManageSession from "./ManageSession";
import { Heart } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Menu } from "lucide-react";
import NavBarWrapper from "./NavBarWrapper";

export const experimental_ppr = true;

const Navbar = async () => {
  const session = await auth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBarWrapper session={session} />
    </Suspense>
  );
};

export default Navbar;
