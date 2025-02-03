"use client";
import { useState, useRef, useEffect } from "react";
import SearchPopUp from "./SearchPopUp";
import ReactDOM from "react-dom"; // create a portal to top level of the dom
import { X, Search } from "lucide-react";

const Searchbar = ({ query }: { query?: string }) => {
  const [clicked, setClicked] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node) &&
      popupRef.current &&
      !popupRef.current.contains(event.target as Node)
    ) {
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

  const handleformClick = (e: any) => {
    setClicked(!clicked);
  };

  return (
    <>
      <div ref={searchRef} className="search-form">
        <Search size="18px" className="" />
        <input
          name="query"
          className="search-input"
          placeholder="Search..."
          onClick={handleformClick}
          readOnly
        ></input>
        <X size="22px" strokeWidth={1.1} />
      </div>
      {clicked &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <div ref={popupRef}>
            <SearchPopUp query={query} setClicked={setClicked} />
          </div>,
          document.body
        )}
    </>
  );
};

export default Searchbar;
