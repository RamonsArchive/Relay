"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import SearchPopUp from "./SearchPopUp";
import { X, Search } from "lucide-react";
import { Session } from "next-auth";
import { RecentSearches } from "@/globalTypes";

const Searchbar = ({
  session,
  compactMode = false,
  initialSearches,
}: {
  session: Session | null;
  compactMode?: boolean;
  initialSearches: RecentSearches;
}) => {
  const [clicked, setClicked] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setClicked(false);
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setClicked(false);
    }
  };

  useEffect(() => {
    if (clicked) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside); // Mobile support
      document.addEventListener("keydown", handleEscapeKey); // Escape key support
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside); // Mobile support
      document.removeEventListener("keydown", handleEscapeKey); // Escape key support
    };
  }, [clicked]);

  return (
    <>
      {compactMode ? (
        <div className="navbar-icon-compact" onClick={() => setClicked(true)}>
          <Search className="size-[22px] sm:size-[26px] md:size-[30px]" />
        </div>
      ) : (
        /* Full Search Bar */
        <div
          className="flex items-center gap-2 border border-black border-[1px] rounded-full px-3 py-1 cursor-pointer md:flex hidden"
          onClick={() => setClicked(true)}
        >
          <Search size="18px" />
          <input
            name="query"
            className="bg-transparent outline-none w-full placeholder-gray-400 cursor-pointer"
            placeholder="Search..."
            readOnly
          />
          <X
            size="22px"
            strokeWidth={1.1}
            className="text-gray-500 hover:text-black transition"
          />
        </div>
      )}
      <Suspense fallback={null}>
        <SearchPopUp
          session={session}
          clicked={clicked}
          setClicked={setClicked}
          initialSearches={initialSearches}
        />
      </Suspense>
    </>
  );
};

export default Searchbar;
