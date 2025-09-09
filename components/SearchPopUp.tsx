"use client";
import Link from "next/link";
import Form from "next/form";
import SearchBarReset from "./SearchBarReset";
import React, {
  useState,
  useActionState,
  useContext,
  useEffect,
  useRef,
  Suspense,
} from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/context";
import { useSearchParams, usePathname } from "next/navigation";
import { Session } from "next-auth";
import { writeRecentSearch } from "@/sanity/lib/actions";
import Loader from "./Loader";
import { ActionState, RecentSearches } from "@/globalTypes";
import {
  fetchRecentSearchesFew,
  revalidateRecentSearches,
} from "@/lib/serverActions";
import { startTransition } from "react";
import { parseServerActionResponse } from "@/lib/utils";

// TODO: Implement RECENTS

interface Props {
  session: Session | null;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  initialSearches: RecentSearches;
}

const SearchPopUp = ({
  session,
  clicked,
  setClicked,
  initialSearches,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const path = usePathname();
  const query = searchParams.get("query") || "";

  const [searchHistory, setSearchHistory] = useState(initialSearches);

  const [inputValue, setInputValue] = useState("");

  const { resetFilters } = useContext(Context);
  const oldQuery = useRef<string | undefined>(query);
  const dropDownRef = useRef<HTMLElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropDownRef && !dropDownRef.current?.contains(event.target as Node)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    if (clicked) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  });

  useEffect(() => {
    const refreshSearches = async () => {
      const userId = session?.user?.id || "";
      if (session && userId) {
        const newSearches = await fetchRecentSearchesFew(userId);
        setSearchHistory(newSearches);
      }
    };
    refreshSearches();
  }, [query, path, session]);

  useEffect(() => {
    if (query && query !== oldQuery.current) {
      setClicked(false);
      setInputValue("");
    }
    oldQuery.current = query;
  }, [query]);

  const updateSearchHistory = (query: string) => {
    if (!query) {
      return;
    }
    setSearchHistory((prev) => prev.filter((item) => item.query !== query));
  };

  const handleFromSubmit = async (
    prevState: ActionState,
    formData: FormData
  ) => {
    try {
      const query = formData.get("query")?.toString().trim() || undefined;
      if (!query) {
        return;
      }
      const userId = session?.user?.id;
      resetFilters();
      router.push(`/?query=${encodeURIComponent(query).toLowerCase()}`);
      if (userId) {
        try {
          await writeRecentSearch(userId, query);
        } catch (error) {
          console.error(error);
        }
      }
      revalidateRecentSearches();
      setInputValue("");
      setClicked(false);
      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
      });
    } catch (error) {
      console.error(error);
      return {
        ...prevState,
        error: "An error occurred, please try again.",
        STATUS: "ERROR",
      };
    }
  };

  /* TODO: ADD A LOADING SCREEN USING REACT.PORTAL TO THE HOME PAGE */
  const [_state, formAction, isPending] = useActionState(handleFromSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <main
      className={`fixed top-0 left-0 h-full md:h-[80vh] w-full z-50 p-3 bg-white-300 shadow-sm shadow-third-300 text-third-300 transform transition-all duration-300 ease-in-out ${clicked ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      ref={dropDownRef}
    >
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-[999]">
          <Loader />
        </div>
      )}
      <div className="relative flex justify-between items-center w-full">
        <div
          className="sm:h-16 cursor-pointer cursor-pointer"
          onClick={() => setClicked(false)}
        >
          <Link href="/">
            <img
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={50}
              height={50}
              className="object-cover"
            />
          </Link>
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition duration-200 self-start ease-in-out active:bg-gray-400"
          onClick={() => setClicked(false)}
        >
          <X
            size="30px"
            className="cursor-pointer text-gray-600"
            strokeWidth={1}
          />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full px-4 pt-8">
        <Form action={formAction} className="w-full max-w-lg" id="search-form">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm w-full">
            <button type="submit" disabled={isPending}>
              <Search size="22px" className="text-gray-700 cursor-pointer" />
            </button>

            <input
              name="query"
              className="w-full bg-transparent pl-2 outline-none placeholder-gray-400 text-black text-lg"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isPending}
            ></input>

            <Suspense fallback={<div> reset search </div>}>
              <SearchBarReset setInputValue={setInputValue} />
            </Suspense>
          </div>
        </Form>
        <div className="flex flex-col justify-center items-center w-full max-w-lg mt-10 gap-y-5 text-center">
          <div className="flex flex-col gap-y-4">
            <div className="font-plex-sans font-regular text-md sm:text-lg text-left ">
              Recent Searches
            </div>
            <div className="flex flex-wrap gap-3">
              {searchHistory && searchHistory.length > 0 ? (
                searchHistory.map((queryObj, index) =>
                  queryObj.query ? (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-2 font-plex-sans text-white px-3 py-2 bg-gray-500 rounded-full hover:bg-gray-400 transition duration-200 ease-in-out"
                    >
                      <button
                        className=""
                        onClick={async () => {
                          setInputValue(queryObj.query as string);
                          const formData = new FormData();
                          formData.append("query", queryObj.query as string);
                          startTransition(() => {
                            formAction(formData);
                          });
                        }}
                      >
                        {queryObj.query as string}
                      </button>
                      <button
                        className="transition hover:scale-125 duration-200 ease-in-out"
                        onClick={() =>
                          updateSearchHistory(queryObj.query as string)
                        }
                      >
                        <X className="size-[12px] sm:size-[15px]" />
                      </button>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-gray-500 text-sm">No recent searches</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPopUp;
