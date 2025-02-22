"use client";
import Footer from "@/components/Footer";
import { getDynamicFilters } from "@/lib/filters";
import { useSearchParams, usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

/* Context for checkboxes in my filters closes filters after search and on homepage*/

type FilterContextType = {
  filters: Record<string, { expanded: boolean; options: string[] }>;
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  toggleFilter: (category: string, filter: string) => void;
  toggleCategory: (category: string) => void;
  resetFilters: () => void;
};
export const Context = createContext<FilterContextType>({
  filters: {},
  selectedFilters: {},
  setSelectedFilters: () => {},
  toggleFilter: () => {},
  toggleCategory: () => {},
  resetFilters: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const query: string | undefined = searchParams.get("query") || "";
  const filterParams = searchParams.get("f") || "";

  const [filters, setFilters] = useState<
    Record<string, { expanded: boolean; options: string[] }>
  >({});
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    getDynamicFilters().then((data) => {
      const formattedFilters = Object.entries(data).reduce(
        (acc, [key, values]) => {
          acc[key] = { expanded: false, options: values };
          return acc;
        },
        {} as Record<string, { expanded: boolean; options: string[] }>
      );
      setFilters(formattedFilters);
    });
  }, []);

  /* Set queryParams when filter is clicked*/
  useEffect(() => {
    const clickedFilters = Object.values(selectedFilters)
      .flat()
      .filter(Boolean)
      .join(",");
    console.log("Clicked filters", clickedFilters);

    let newQueryParams = path;
    const queryParams = new URLSearchParams();
    if (clickedFilters) queryParams.set("f", clickedFilters);
    if (query) queryParams.set("query", query);

    if (queryParams.toString()) {
      newQueryParams += `?${queryParams.toString()}`;
    }
    console.log(`QueyrParams: ${queryParams}`);
    console.log(`New QueryParams: ${newQueryParams}`);
    router.push(newQueryParams.toLowerCase());
  }, [selectedFilters]);

  /* Sync with url */
  useEffect(() => {
    console.log("Three below are in context");
    console.log(`Path: ${path}`);
    console.log(`Query: ${query}`);
    console.log(`Filters: ${filters}`);

    const isReturingFromSignIn = document.referrer.includes("/sign-in");
    console.log(`Is returning from sign-in: ${isReturingFromSignIn}`);
    const currentSignIn =
      path.includes("/sign-in") || path.includes("callbackUrl");

    if (currentSignIn || isReturingFromSignIn) {
      console.log(
        "Path includes /sign-in or is returning from sing-in - correcltly passed resetting filters"
      );
      return;
    }

    if (filters) {
      // TODO: USE USE REF OR USESTATE TO RUN THIS ONLY ON CALLBACK
      /* console.log("Syncing selectedFilters with filtersParams");
      const parsedFilters = filterParams.split(",").reduce(
        (acc: Record<string, string[]>, item) => {
          const [category, value] = item.split(":");
          if (category && value) {
            acc[category] = acc[category] ? [...acc[category], value] : [value];
          }
          return acc;
        },
        {} as Record<string, string[]>
      );

      console.log("Syncing selectedFilters from URL:", parsedFilters);
      setSelectedFilters(parsedFilters); */
    } else if (!query && !filters) {
      console.log("Resetting filters in context might be ERROR");
      resetFilters();
    }
    console.log("Correclty passed resetting filters in context");
  }, [query, filterParams]);

  const resetFilters = () => {
    setSelectedFilters({});
  };

  const toggleFilter = (category: string, filter: string) => {
    console.log("Toggling filter", category, filter);
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category]?.includes(filter)) {
        newFilters[category] = newFilters[category].filter((f) => f !== filter);
        if (newFilters[category].length === 0) delete newFilters[category];
      } else {
        newFilters[category] = [...(newFilters[category] || []), filter];
      }
      console.log("New filters", newFilters);
      Object.entries(selectedFilters).forEach(([category, filter]) => {
        console.log(`Category: ${category}, filter: ${filter}`);
      });
      return newFilters;
    });
    Object.entries(selectedFilters).forEach(([category, filter]) => {
      console.log(`Category: ${category}, filter: ${filter}`);
    });
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        expanded: !prev[category].expanded,
      },
    }));
  };

  return (
    <Context.Provider
      value={{
        filters,
        selectedFilters,
        setSelectedFilters,
        toggleFilter,
        toggleCategory,
        resetFilters,
      }}
    >
      {children}
    </Context.Provider>
  );
};
