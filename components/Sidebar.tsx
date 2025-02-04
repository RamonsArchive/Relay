"use client";
import { use, useEffect, useRef } from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CheckBox from "./CheckBox";
import { getDynamicFilters } from "@/lib/filters";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Sidebar = ({ query }: { query?: string | undefined }) => {
  /* drop down icons for each filter */

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
  /* Checkbox for each filter passed as prop*/

  /* store fetched data */
  const [optimizedFilters, setOptimizedFilters] = useState<
    Record<string, string[]>
  >({});

  /* Get only selected filters*/
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      const queryFilters = query.split(" ").filter(Boolean);
      console.log(`Query filters: ${queryFilters}`);
      setSelectedFilters(queryFilters);
    } else {
      setSelectedFilters([]);
    }
  }, [query]);

  const handleCheckedFilters = (filter: string) => {
    console.log(`Selected filter: ${filter}`);
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(filter)
        ? prev.filter((item) => item !== filter) // Remove if already selected
        : [...prev, filter]; // Add new filter

      console.log(`Updated selected filters: ${updatedFilters}`);

      // Convert pathParams to a proper format
      if (!pathParams) {
        const formattedPathParams =
          pathParams !== "/" ? pathParams.split("/").join(" ") : "";
        console.log(`Path params: ${formattedPathParams}`);

        // Merge filters with pathParams, ensuring no duplicates
        const searchQuery = [
          ...new Set([formattedPathParams, ...updatedFilters]),
        ]
          .filter(Boolean) // Remove empty values
          .join(" ");

        console.log(`Updated search query: ${searchQuery}`);

        // Push updated query to URL
        router.push(`/?query=${encodeURIComponent(searchQuery).toLowerCase()}`);
      } else {
        // Push updated query to URL without pathParams if it doesn't exist
        router.push(
          `/?query=${encodeURIComponent(updatedFilters.join(" ")).toLowerCase()}`
        );
      }

      return updatedFilters; // Update state
    });
  };

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await getDynamicFilters();
      setOptimizedFilters(filters);
    };
    fetchFilters();
  }, []);

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
