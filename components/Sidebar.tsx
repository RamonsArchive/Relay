"use client";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CheckBox from "./CheckBox";
import { getDynamicFilters } from "@/lib/filters";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/context";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const filtersParams = searchParams.get("f");

  const [optimizedFilters, setOptimizedFilters] = useState<
    Record<string, string[]>
  >({});

  const {
    selectedFilters,
    setSelectedFilters,
    droppedFilters,
    setDroppedFilters,
  } = useContext(Context);

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await getDynamicFilters();
      setOptimizedFilters(filters);
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    let combinedRoute = "";
    if (selectedFilters.length === 0) {
      combinedRoute = query
        ? `${path}/?query=${encodeURIComponent(query).toLowerCase()}`
        : path;
      router.push(combinedRoute);
      return;
    } else {
      const paramsFilters = selectedFilters.join(",");

      combinedRoute = `${path}/?f=${encodeURIComponent(paramsFilters).toLowerCase()}`;

      if (query) {
        combinedRoute += `&query=${encodeURIComponent(query).toLowerCase()}`;
      }
      console.log(`Path: ${path}`);
      console.log(`Query: ${query}`);
      console.log(`Combined route: ${combinedRoute}`);
      router.push(combinedRoute);
    }
  }, [selectedFilters]);

  const handleClickedChevron = (chevron: string) => {
    setDroppedFilters((prev) => ({
      ...prev,
      [chevron]: prev[chevron] !== undefined ? !prev[chevron] : true,
    }));
  };

  const handleCheckedFilters = (filter: string) => {
    console.log(`Selected filter: ${filter}`);
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
            <button onClick={() => handleClickedChevron("gender")}>
              {droppedFilters.gender ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.gender &&
            optimizedFilters.gender.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Kids</span>
            <button onClick={() => handleClickedChevron("kids")}>
              {droppedFilters.kids ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.kids &&
            optimizedFilters.kids.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Size</span>
            <button onClick={() => handleClickedChevron("size")}>
              {droppedFilters.size ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.size &&
            optimizedFilters.size.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Cost</span>
            <button onClick={() => handleClickedChevron("cost")}>
              {droppedFilters.cost ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.cost &&
            optimizedFilters.cost.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Sale</span>

            <button onClick={() => handleClickedChevron("sale")}>
              {droppedFilters.sale ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.sale &&
            optimizedFilters.sale.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Collections</span>

            <button onClick={() => handleClickedChevron("collections")}>
              {droppedFilters.collections ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.collections &&
            optimizedFilters.collections.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Colors</span>
            <button onClick={() => handleClickedChevron("colors")}>
              {droppedFilters.colors ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.colors &&
            optimizedFilters.colors.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Brand</span>
            <button onClick={() => handleClickedChevron("brands")}>
              {droppedFilters.brands ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.brands &&
            optimizedFilters.brands.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Materials</span>
            <button onClick={() => handleClickedChevron("materials")}>
              {droppedFilters.materials ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.materials &&
            optimizedFilters.materials.map((option, index) => (
              <button key={index} onClick={() => handleCheckedFilters(option)}>
                <CheckBox options={option} />
              </button>
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Categories</span>
            <button onClick={() => handleClickedChevron("categories")}>
              {droppedFilters.categories ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
          {droppedFilters.categories &&
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
