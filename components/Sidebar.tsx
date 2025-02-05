"use client";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CheckBox from "./CheckBox";
import { getDynamicFilters } from "@/lib/filters";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FilterContext } from "@/app/(src)/layout";

const Sidebar = ({ query }: { query?: string | undefined }) => {
  const pathParams = usePathname();
  const router = useRouter();

  /* Will be using this as the defualt value for the groq query */
  const [genderDrop, setGenderDrop] = useState(false);
  const [kidsDrop, setKidsDrop] = useState(false);
  const [sizeDrop, setSizeDrop] = useState(false);
  const [costDrop, setCostDrop] = useState(false);
  const [saleDrop, setSaleDrop] = useState(false);
  const [colorDrop, setColorDrop] = useState(false);
  const [brandDrop, setBrandDrop] = useState(false);
  const [categoriesDrop, setCategoriesDrop] = useState(false);
  const [materialDrop, setMaterialDrop] = useState(false);
  const [collectionDrop, setCollectionDrop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* store fetched data */
  const [optimizedFilters, setOptimizedFilters] = useState<
    Record<string, string[]>
  >({});

  /* Get only selected filters*/
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
  /* Get Is navlink page */
  const { isNavigatingToNonQueryRoute, setIsNavigatingToNonQueryRoute } =
    useContext(FilterContext);

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await getDynamicFilters();
      setOptimizedFilters(filters);
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    // Merge filters with pathParams (if any)
    console.log(`isNavigatingToNonQueryRoute: ${isNavigatingToNonQueryRoute}`);
    if (isNavigatingToNonQueryRoute) {
      setIsNavigatingToNonQueryRoute(false);
      return;
    }
    console.log(`pathParams: ${pathParams}`);
    let newSearchQuery = selectedFilters.join(" ");

    if (pathParams && pathParams !== "/") {
      const formattedPathParams = pathParams.split("/").pop() || "";
      newSearchQuery = [...new Set([...selectedFilters, formattedPathParams])]
        .filter(Boolean) // Remove empty values
        .join(" "); // Join filters with spaces
    }

    console.log(`Updated search query: ${newSearchQuery}`);
    setSearchQuery(newSearchQuery);
  }, [selectedFilters]);

  useEffect(() => {
    if (searchQuery) {
      router.push(`/?query=${encodeURIComponent(searchQuery).toLowerCase()}`);
    } else {
      router.push("/");
    }
  }, [searchQuery]);

  const handleCheckedFilters = (filter: string) => {
    console.log(`Selected filter: ${filter}`);

    // Parse the query from the URL and split by comma so muti-word filters are preserved
    /*const normalizedQuery = query ? decodeURIComponent(query) : "";
    const queryFilters = normalizedQuery
      .split(",")
      .map((filter) => filter.trim().toLowerCase())
      .filter(Boolean);

    console.log(`Query filters: ${queryFilters}`);*/

    // Update selectedFilters based on the current filter
    setSelectedFilters((prev) => {
      const lowerCaseFilter = filter.toLowerCase();
      console.log("Previous selected filters: ", prev);

      // Check if the filter is already selected
      const updatedFilters = prev.includes(lowerCaseFilter)
        ? prev.filter((item) => item.toLowerCase() !== lowerCaseFilter) // Remove if already selected
        : [...prev, lowerCaseFilter]; // Add new filter

      console.log(`Updated selected filters: ${updatedFilters}`);

      return updatedFilters; // Update state
    });
  };

  return (
    <aside className="side-bar">
      <div className="flex items-center justify-center w-full py-3 sticky top-0 bg-white-300 z-2 ">
        <span className="font-plext-sans font-bold items-center text-[22px]">
          Filters
        </span>
      </div>

      <div className="side-bar-container">
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Gender</span>
            {genderDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setGenderDrop(!genderDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setGenderDrop(!genderDrop)}
              />
            )}
          </div>
          {genderDrop &&
            optimizedFilters.gender.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Kids</span>
            {kidsDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setKidsDrop(!kidsDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setKidsDrop(!kidsDrop)}
              />
            )}
          </div>
          {kidsDrop &&
            optimizedFilters.kids.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Size</span>
            {sizeDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setSizeDrop(!sizeDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setSizeDrop(!sizeDrop)}
              />
            )}
          </div>
          {sizeDrop &&
            optimizedFilters.size.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Cost</span>
            {costDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCostDrop(!costDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCostDrop(!costDrop)}
              />
            )}
          </div>
          {costDrop &&
            optimizedFilters.cost.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Sale</span>
            <div className="shrink-0">
              {saleDrop ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                  onClick={() => setSaleDrop(!saleDrop)}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                  onClick={() => setSaleDrop(!saleDrop)}
                />
              )}
            </div>
          </div>
          {saleDrop &&
            optimizedFilters.sale.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Collections</span>
            <div className="shrink-0">
              {collectionDrop ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                  onClick={() => setCollectionDrop(!collectionDrop)}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                  onClick={() => setCollectionDrop(!collectionDrop)}
                />
              )}
            </div>
          </div>
          {collectionDrop &&
            optimizedFilters.collections.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Colors</span>
            {colorDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setColorDrop(!colorDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setColorDrop(!colorDrop)}
              />
            )}
          </div>
          {colorDrop &&
            optimizedFilters.colors.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Brand</span>
            {brandDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setBrandDrop(!brandDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setBrandDrop(!brandDrop)}
              />
            )}
          </div>
          {brandDrop &&
            optimizedFilters.brands.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Materials</span>
            {materialDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setMaterialDrop(!materialDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setMaterialDrop(!materialDrop)}
              />
            )}
          </div>
          {materialDrop &&
            optimizedFilters.materials.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Categories</span>
            {categoriesDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCategoriesDrop(!categoriesDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCategoriesDrop(!categoriesDrop)}
              />
            )}
          </div>
          {categoriesDrop &&
            optimizedFilters.categories.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

/* console.log(`Selected filter: ${filter}`);
    setSelectedFilters((prev) => {
      const lowerCaseFilter = filter.toLowerCase();
      console.log("Previous selected filters: ", prev);
      const updatedFilters = prev.includes(lowerCaseFilter)
        ? prev.filter((item) => item.toLowerCase() !== lowerCaseFilter) // Remove if already selected
        : [...prev, lowerCaseFilter]; // Add new filter

      console.log(`Updated selected filters: ${updatedFilters}`);

      // Convert pathParams to a proper format
      if (pathParams) {
        const formattedPathParams =
          pathParams !== "/" ? pathParams.split("/").pop() : "";
        console.log(`Path params: ${formattedPathParams}`);

        // Merge filters with pathParams, ensuring no duplicates
        const searchQuery = [
          ...new Set([...updatedFilters, formattedPathParams]),
        ]
          .filter(Boolean) // Remove empty values
          .join(" ");

        console.log(`Updated search path: ${searchQuery}`);

        // Push updated query to URL
        router.push(`/?query=${encodeURIComponent(searchQuery).toLowerCase()}`);
      } else {
        // Push updated query to URL without pathParams if it doesn't exist
        
        console.log(`query: ${query}`);
        const searchQuery = [...new Set([query, ...updatedFilters])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        console.log(`Updated search query: ${searchQuery}`);
        router.push(`/?query=${encodeURIComponent(searchQuery)}`); 
      }

      return updatedFilters; // Update state
    }); */

/* MOSTLY FIXED SOMETIMES WHEN I CLICK ON FILTER, IT DOESN'T REGISTER THE CLICK BUT SHOWS UP IN PARAMS AND THEN WHEN I CLICK IT SHOWS BUT REMOVES FROM PARAMS*/
/*useEffect(() => {
    if (query) {
      console.log(`Query should be updated no filter selected ${query}`);

      // Normalize query by decoding URI components
      const normalizedQuery = decodeURIComponent(query);

      // Split the query by commas to preserve multi-word filters
      const queryFilters = normalizedQuery
        .split(",") // Split by comma
        .map((filter) => filter.trim().toLowerCase()) // Trim and lowercase each filter
        .filter(Boolean); // Remove empty strings

      console.log(`Query filters: ${queryFilters}`);
      setSelectedFilters(queryFilters);
      // Log the updated selected filters (note: state updates are asynchronous)
      console.log(`Updated query no filters: ${selectedFilters}`);
    } else {
      console.log("Query should be updated no none selected ");
      setSelectedFilters([]);
      console.log(`Updated query to none no filters: ${selectedFilters}`);
      // I might need to push an empty router? but I think it's already empty.
    }
  }, [query]);*/
