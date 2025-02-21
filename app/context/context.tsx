"use client";
import Footer from "@/components/Footer";
import { useSearchParams, usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import React from "react";

/* Context for checkboxes in my filters closes filters after search and on homepage*/
export const Context = createContext<{
  checkedFilters: Record<string, boolean>;
  setCheckedFilters: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  droppedFilters: Record<string, boolean>;
  setDroppedFilters: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}>({
  checkedFilters: {},
  setCheckedFilters: () => {},
  selectedFilters: [],
  setSelectedFilters: () => [],
  droppedFilters: {},
  setDroppedFilters: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const query: string | undefined = searchParams.get("query") || "";
  const filters = searchParams.get("f") || "";

  const [checkedFilters, setCheckedFilters] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [droppedFilters, setDroppedFilters] = useState<Record<string, boolean>>(
    {
      gender: false,
      kids: false,
      size: false,
      cost: false,
      sale: false,
      collections: false,
      colors: false,
      brands: false,
      category: false,
      materials: false,
    }
  );

  /*useEffect(() => {
    if (selectedFilters.length === 0 && filters?.length > 0) {
      console.log("Syncing selectedFilters with filtersParams");
      setSelectedFilters(filters?.split(","));
    }
  }, [filters]);*/

  useEffect(() => {
    console.log("Three below are in context");
    console.log(`Path: ${path}`);
    console.log(`Query: ${query}`);
    console.log(`Filters: ${filters}`);

    const isReturingFromSignIn = document.referrer.includes("/sign-in");
    console.log(`Is returning from sign-in: ${isReturingFromSignIn}`);
    const currentSignIn =
      path.includes("/sign-in") || path.includes("callbackUrl");

    if (currentSignIn) {
      console.log("Path includes /sign-in correcltly passed resetting filters");
      return;
    }
    if (isReturingFromSignIn) {
      console.log("Returning from sign-in correcltly passed resetting filters");
      return;
    }

    if (filters) {
      console.log("Syncing selectedFilters with filtersParams");
      setSelectedFilters(filters.split(",").map((f) => f.trim().toLowerCase()));
      console.log(`Selected filters in contex: ${selectedFilters}`);
    } else if (!query && !filters) {
      console.log("Resetting filters in context might be ERROR");
      setCheckedFilters({});
      setSelectedFilters([]);
      setDroppedFilters((prev) => {
        const resetFilters = Object.keys(prev).reduce(
          (acc, key) => {
            acc[key] = false;
            return acc;
          },
          {} as Record<string, boolean>
        );
        return resetFilters;
      });
    }
    console.log("Correclty passed resetting filters in context");
  }, [query, filters]);

  return (
    <Context.Provider
      value={{
        checkedFilters,
        setCheckedFilters,
        selectedFilters,
        setSelectedFilters,
        droppedFilters,
        setDroppedFilters,
      }}
    >
      {children}
    </Context.Provider>
  );
};
