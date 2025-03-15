"use client";
import Footer from "@/components/Footer";
import { getDynamicFilters } from "@/lib/filters";
import { useSearchParams, usePathname } from "next/navigation";
import { createContext, useEffect, useState, useRef } from "react";
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
  console.log("Query in context provider", query);
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
      console.log("Back button clicked");
      setBackButtonClicked(true); // Call the sync function
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    console.log("Checking if filters are saved in session storage");
    const savedToggledCategoryFilters = sessionStorage.getItem("filters");
    if (savedToggledCategoryFilters) return;
    console.log("Setting default filters since no session storage");
    setDefaultFilters();
  }, []);

  useEffect(() => {
    console.log("Filters has been toggled");
    if (filters !== null && !shouldSync) {
      console.log("Setting filters in session storage", filters);
      sessionStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters]);

  useEffect(() => {
    if (
      path.includes("/sign-in") ||
      path.includes("/product") ||
      path.includes("/writeReview")
    ) {
      console.log("Path includes /sign-in or /product or /writeReview");
      return;
    }
    //router.refresh();

    const clickedFilters = Object.values(selectedFilters)
      .flat()
      .filter(Boolean)
      .join(",");
    console.log("Clicked filters", clickedFilters);

    /* const alreadyQueryParams = new URLSearchParams(window.location.search);
    const existingQuery = alreadyQueryParams.get("query") || ""; // Ensure it's a string
    console.log("Existing query", existingQuery); */

    let newQueryParams = path;
    const queryParams = new URLSearchParams();
    if (clickedFilters) queryParams.set("f", clickedFilters);
    if (query) queryParams.set("query", query);

    if (queryParams.toString()) {
      newQueryParams += `?${queryParams.toString()}`;
    }
    console.log(`QueyrParams: ${queryParams}`);
    console.log(`New QueryParams: ${newQueryParams}`);

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
    console.log("Three below are in context");
    console.log(`Path: ${path}`);
    console.log(`Query: ${query}`);
    console.log(`Filter Params: ${filterParams}`);
    console.log(`Filters: ${filters}`);

    const currentSignIn =
      path.includes("/sign-in") || path.includes("callbackUrl");

    if (currentSignIn) {
      console.log(
        "Path includes /sign-in or is returning from sing-in - correcltly passed resetting filters"
      );
      sessionStorage.setItem("shouldSync", "true");
      console.log(`Should sync: ${shouldSync}`);
      setShouldSync(true);
      console.log();
      return;
    }

    console.log(`Should sync: ${shouldSync}`);
    if (shouldSync) {
      const savedFilters = sessionStorage.getItem("selectedFilters");
      const savedToggledFilters = sessionStorage.getItem("filters");
      console.log(`Saved filters: ${savedFilters}`);
      console.log(`Saved toggled filters: ${savedToggledFilters}`);

      if (savedFilters) {
        console.log("Syncing selectedFilters from session storage");
        setSelectedFilters(JSON.parse(savedFilters));
      }
      if (savedToggledFilters) {
        console.log("Syncing filters from session storage");
        setFilters(JSON.parse(savedToggledFilters));
      }
      sessionStorage.setItem("shouldSync", "false");
      setShouldSync(false);
    }

    // TODO: enable go back button on history to sync filters
    if (backButtonClicked) {
      console.log("Back button clicked");
      syncFiltersSidebar();
      setBackButtonClicked(false);
    }
    if (!query && !filterParams) {
      console.log("Resetting filters in context might be ERROR");
      resetFilters();
    } else if (query && !filterParams) {
      console.log("Resetting on page reload ");
      resetFilters();
    }
    console.log("Correclty passed resetting filters in context");
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
          (value: string) => numCurrentFiltersSelected++
        );
      });

      /* if (numCurrentFiltersSelected === 0) {
        return;
      } */
      console.log("numcurrentFiltersSelected", numCurrentFiltersSelected);
      if (numFilterParams > numCurrentFiltersSelected) {
        console.log("Filter params", parsedFilters);
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
        console.log("Filter params", parsedFilters);
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
      //selectedFiltersRef.current = newFilters;
      return newFilters;
    });
  };

  const setDefaultFilters = () => {
    console.log("Setting default filters");
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
  };

  const toggleCategory = (category: string) => {
    console.log("toggeling category");
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
