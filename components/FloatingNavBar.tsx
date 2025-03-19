import Link from "next/link";
import Image from "next/image";
import React from "react";
import Searchbar from "./Searchbar";
import { Session } from "next-auth";
import { Heart, Menu } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import ManageSession from "./ManageSession";
import { RecentSearches } from "@/globalTypes";
import MenuOptions from "./MenuOptions";
import NavBarHeart from "./NavBarHeart";

const FloatingNavBar = ({
  session,
  recentSearches,
}: {
  session: Session | null;
  recentSearches: RecentSearches;
}) => {
  const compactMode = true;
  return (
    <nav className="flex flex-row gap-3 justify-between items-center w-full md:hidden">
      <div className="w-10 h-15 shrink-0">
        <Link href="/" className="">
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
        <div className="w-5 h-4">
          <Image
            src={"/assets/icons/palestine.svg"}
            alt="Free Palestine"
            width={30}
            height={20}
            className="w-full h-auto relative group group-border glow-border"
          />
        </div>
        <span className="max-w-[15px]">Relay stands with Palestine</span>
      </div>
      <div className="flex items-center sm:gap-2 ml-auto">
        <Searchbar
          session={session}
          compactMode={compactMode}
          recentSearches={recentSearches}
        />
        <NavBarHeart />
        <div className="p-2">
          <ManageSession session={session} />
        </div>
        <div className="navbar-icon-compact">
          <Link href="/">
            <ShoppingBasket
              strokeWidth={1.4}
              className="size-[26px] sm:size-[30px]"
            />
          </Link>
        </div>

        <MenuOptions />
      </div>
    </nav>
  );
};

export default FloatingNavBar;
