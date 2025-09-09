"use client";
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
  const [backButtonClicked, setBackButtonClicked] = useState(false);

  const [shouldSync, setShouldSync] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("shouldSync") === "true";
    }
    return false; // Default value for SSR
  });

  const [filters, setFilters] = useState<
    Record<string, { expanded: boolean; options: string[] }>
  >({});
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const handlePopState = () => {
      setBackButtonClicked(true); // Call the sync function
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const savedToggledCategoryFilters = sessionStorage.getItem("filters");
    if (savedToggledCategoryFilters) return;
    setDefaultFilters();
  }, []);

  useEffect(() => {
    if (filters !== null && !shouldSync) {
      sessionStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters]);

  useEffect(() => {
    if (
      path.includes("/sign-in") ||
      path.includes("/product") ||
      path.includes("/writeReview")
    ) {
      return;
    }

    const clickedFilters = Object.values(selectedFilters)
      .flat()
      .filter(Boolean)
      .join(",");

    let newQueryParams = path;
    const queryParams = new URLSearchParams();
    if (clickedFilters) queryParams.set("f", clickedFilters);
    if (query) queryParams.set("query", query);

    if (queryParams.toString()) {
      newQueryParams += `?${queryParams.toString()}`;
    }

    // only on return from sign-in do we sest selectedFilters to storage
    if (Object.keys(selectedFilters).length > 0 && !shouldSync) {
      console.log("Setting selectedFilters in session storage");
      sessionStorage.setItem(
        "selectedFilters",
        JSON.stringify(selectedFilters)
      );
    }
    router.push(newQueryParams.toLowerCase());
  }, [selectedFilters]);

  /* Sync with url */
  useEffect(() => {
    const currentSignIn =
      path.includes("/sign-in") || path.includes("callbackUrl");

    if (currentSignIn) {
      console.log(
        "Path includes /sign-in or is returning from sing-in - correcltly passed resetting filters"
      );
      sessionStorage.setItem("shouldSync", "true");
      setShouldSync(true);
      return;
    }

    console.log(`Should sync: ${shouldSync}`);
    if (shouldSync) {
      const savedFilters = sessionStorage.getItem("selectedFilters");
      const savedToggledFilters = sessionStorage.getItem("filters");

      if (savedFilters) {
        setSelectedFilters(JSON.parse(savedFilters));
      }
      if (savedToggledFilters) {
        setFilters(JSON.parse(savedToggledFilters));
      }
      sessionStorage.setItem("shouldSync", "false");
      setShouldSync(false);
    }

    // TODO: enable go back button on history to sync filters
    if (backButtonClicked) {
      syncFiltersSidebar();
      setBackButtonClicked(false);
    }
    if (!query && !filterParams) {
      resetFilters();
    } else if (query && !filterParams) {
      resetFilters();
    }
  }, [query, filterParams]);

  const resetFilters = () => {
    console.log("Resetting filters");
    sessionStorage.removeItem("selectedFilters");
    sessionStorage.removeItem("filters");
    setSelectedFilters({});
    setDefaultFilters();
  };

  const syncFiltersSidebar = () => {
    if (filterParams) {
      console.log("Filter params", filterParams);
      const parsedFilters = filterParams.split(",").filter(Boolean);
      const numFilterParams = parsedFilters.length;
      const updatedFilters = JSON.parse(JSON.stringify(selectedFilters));
      const updatedSidebarFilters = JSON.parse(JSON.stringify(filters));
      console.log("Updated sidebar filters", updatedSidebarFilters);

      let numCurrentFiltersSelected = 0;
      Object.keys(updatedFilters).forEach((category) => {
        updatedFilters[category].forEach(
          () => numCurrentFiltersSelected++
        );
      });

      if (numFilterParams > numCurrentFiltersSelected) {
        parsedFilters.forEach((filterParam) => {
          // Format the filter parameter (e.g., capitalize the first letter)
          const formattedFilterParam =
            filterParam.slice(0, 1).toUpperCase() + filterParam.slice(1);

          // Get the category for the filter parameter
          const categoryFilter = getCategoryFilter(formattedFilterParam);

          if (categoryFilter) {
            // Initialize the category array if it doesn't exist
            updatedSidebarFilters[categoryFilter].expanded = true;
            if (!updatedFilters[categoryFilter]) {
              updatedFilters[categoryFilter] = [];
            }

            // Add the filter parameter to the category if it's not already present
            if (
              !updatedFilters[categoryFilter].includes(formattedFilterParam)
            ) {
              updatedFilters[categoryFilter].push(formattedFilterParam);
            }
          }
        });
        setFilters(updatedSidebarFilters);
      } else {
        Object.keys(updatedFilters).forEach((category) => {
          updatedFilters[category] = updatedFilters[category].filter(
            (value: string) => {
              const shouldKeep = parsedFilters.includes(value.toLowerCase());
              return shouldKeep;
            }
          );
          if (updatedFilters[category].length === 0) {
            delete updatedFilters[category];
          }
        });
      }

      setSelectedFilters(updatedFilters);
    }
  };

  const getCategoryFilter = (filter: string) => {
    for (const [category, { options }] of Object.entries(filters)) {
      if (options.includes(filter)) {
        return category;
      }
    }
    return null;
  };

  const toggleFilter = (category: string, filter: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category]?.includes(filter)) {
        newFilters[category] = newFilters[category].filter((f) => f !== filter);
        if (newFilters[category].length === 0) delete newFilters[category];
      } else {
        newFilters[category] = [...(newFilters[category] || []), filter];
      }
      return newFilters;
    });
  };

  const setDefaultFilters = () => {
    getDynamicFilters().then((data) => {
      const formattedFilters = Object.entries(data).reduce(
        (acc, [key, values]) => {
          acc[key] = {
            expanded: false,
            options: Array.isArray(values) ? values.flat() : values,
          };
          return acc;
        },
        {} as Record<string, { expanded: boolean; options: string[] }>
      );
      setFilters(formattedFilters);
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
