import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import Searchbar from "./Searchbar";
import { Session } from "next-auth";
import ManageSession from "./ManageSession";
import { RecentSearches } from "@/globalTypes";
import MenuOptions from "./MenuOptions";
import NavBarHeart from "./NavBarHeart";
import BasketButton from "./BasketButton";

const FloatingNavBar = ({
  session,
  initialSearches,
}: {
  session: Session | null;
  initialSearches: RecentSearches;
}) => {
  const compactMode = true;
  return (
    <nav className="flex flex-row gap-3 justify-between items-center w-full">
      <div className="w-10 h-15 shrink-0">
        <Link href="/" className="min-h-23">
          <Image
            src="/assets/logo/logo-png.png"
            alt="logo"
            width={60}
            height={60}
            className="w-full h-auto"
          />
        </Link>
      </div>
      <div className="font-plex-sans font-light text-[8px]">
        <div className="relative w-6 h-4">
          <Image
            src={"/assets/icons/palestine.svg"}
            alt="Free Palestine"
            fill
            className="object-cover group group-border glow-border"
          />
        </div>
        <span className="max-w-[15px]">Relay stands with Palestine</span>
      </div>
      <div className="flex items-center sm:gap-1 ml-auto mr-1">
        <Suspense fallback={<div>Loading... </div>}>
          <Searchbar
            session={session}
            compactMode={compactMode}
            initialSearches={initialSearches}
          />
        </Suspense>
        <NavBarHeart />
        <div className="p-2">
          <Suspense fallback={<div>Loading... </div>}>
            <ManageSession session={session} />
          </Suspense>
        </div>
        <div className="navbar-icon-compact">
          <Suspense fallback={<div>Loading... </div>}>
            <BasketButton />
            </Suspense>
        </div>

        <MenuOptions />
      </div>
    </nav>
  );
};

export default FloatingNavBar;
