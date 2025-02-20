"use client";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
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


export const ContextProvider = ({children}: {children: React.ReactNode}) => {
    const searchParams = useSearchParams();
    const query: string | undefined = searchParams.get("query") ?? undefined;
    const filters = searchParams.get("f") ?? undefined;
  
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
  
    useEffect(() => {
      if (!query && !filters) {
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
    }, [query, filters]);

    return (
        <Context.Provider value={{
            checkedFilters,
            setCheckedFilters,
            selectedFilters,
            setSelectedFilters,
            droppedFilters,
            setDroppedFilters,
        }}>
            {children}
        </Context.Provider>
    );
}
