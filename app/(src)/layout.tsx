"use client";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

/* Context for checkboxes in my filters closes filters after search and on homepage*/
export const FilterContext = createContext<{
  checkedFilters: Record<string, boolean>;
  setCheckedFilters: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  isNavigatingToNonQueryRoute: boolean;
  setIsNavigatingToNonQueryRoute: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  checkedFilters: {},
  setCheckedFilters: () => {},
  selectedFilters: [],
  setSelectedFilters: () => [],
  isNavigatingToNonQueryRoute: false,
  setIsNavigatingToNonQueryRoute: () => {},
});

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathParams = usePathname();
  const searchParams = useSearchParams();
  const query: string | undefined = searchParams.get("query") ?? undefined;
  console.log(`layout query: ${query}`);

  const [checkedFilters, setCheckedFilters] = useState<Record<string, boolean>>(
    {}
  );

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isNavigatingToNonQueryRoute, setIsNavigatingToNonQueryRoute] =
    useState(false);

  useEffect(() => {
    console.log("Query in LAYOUT " + query);
    if (!query) {
      if (!isNavigatingToNonQueryRoute) {
        setCheckedFilters({});
        setSelectedFilters([]);
      }
    }
  }, [query]);

  return (
    <FilterContext.Provider
      value={{
        checkedFilters,
        setCheckedFilters,
        selectedFilters,
        setSelectedFilters,
        isNavigatingToNonQueryRoute,
        setIsNavigatingToNonQueryRoute,
      }}
    >
      <main className="root">
        <SignedOut>
          <SignIn />
        </SignedOut>
        <Navbar query={query} />
        <div className="root-container">
          <Sidebar query={query} />
          <Mobilebar />
          <div className="root-container">{children}</div>
        </div>
        <Footer />
      </main>
    </FilterContext.Provider>
  );
};

export default layout;
