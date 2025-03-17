"use client";
import Link from "next/link";
import Image from "next/image";
import Form from "next/form";
import SearchBarReset from "./SearchBarReset";
import React, {
  useState,
  useActionState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { CircleX, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/context";
import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import { writeRecentSearch } from "@/sanity/lib/actions";
import Loader from "./Loader";
import { RecentSearches } from "@/globalTypes";

// TODO: Implement RECENTS

interface Props {
  session: Session | null;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  recentSearches: RecentSearches;
}

const SearchPopUp = ({ session, setClicked, recentSearches }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchHistory, setSearchHistory] = useState(
    recentSearches?.recentSearches || []
  );

  const [inputValue, setInputValue] = useState("");

  const { resetFilters } = useContext(Context);
  const oldQuery = useRef<string | undefined>(query);

  useEffect(() => {
    if (query && query !== oldQuery.current) {
      setClicked(false);
      setInputValue("");
    }
    oldQuery.current = query;
  }, [query]);

  const handleFromSubmit = async (prevState: any, formData: FormData) => {
    try {
      console.log("form data", formData);
      console.log("is pending", isPending);
      const query = formData.get("query")?.toString().trim() || undefined;
      if (!query) {
        return;
      }
      console.log("Query", query);
      const userId = session?.user?.id;
      console.log("About to push");
      resetFilters();
      router.push(`/?query=${encodeURIComponent(query).toLowerCase()}`);
      console.log("After push");
      if (userId) {
        try {
          await writeRecentSearch(userId, query);
        } catch (error) {
          console.error(error);
        }
      }
      setInputValue("");

      return query;
    } catch (error) {
      return {
        ...prevState,
        error: "An error occurred, please try again.",
        STATUS: "ERROR",
      };
    }
  };

  /* TODO: ADD A LOADING SCREEN USING REACT.PORTAL TO THE HOME PAGE */
  const [state, formAction, isPending] = useActionState(handleFromSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <main className="fixed top-0 left-0 h-full md:h-[60vh] w-full z-50 py-3 px-3 bg-white-300 shadow-md shadow-third-300 text-third-300">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-51">
          <Loader />
        </div>
      )}
      <div className="flex justify-between items center w-full">
        <div className="cursor-pointer" onClick={() => setClicked(false)}>
          <Link href="/">
            <Image
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={60}
              height={40}
            />
          </Link>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-400 transition hover:bg-primary-500 duration-200 ease-in-out">
          <X
            size="30px"
            className="cursor-pointer text-white"
            strokeWidth={1}
            onClick={() => setClicked(false)}
          />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
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

            <SearchBarReset setInputValue={setInputValue} />
          </div>
        </Form>
        <div className="flex flex-col justify-center items-center w-full mt-4 gap-y-5 text-center">
          <div className="text-md font-light self-start">Recent Searches</div>
          {searchHistory.length > 0 ? (
            searchHistory.map((queryObj, index) =>
              queryObj.query ? (
                <div key={index}>
                  <button
                    className="px-3 py-2 font-plex-sans text-primary-400 font-semibold hover:underline hover:scale-105 transition duration-200 ease-in-out"
                    onClick={() => {
                      setInputValue(queryObj.query as string);
                      document
                        .getElementById("search-form")
                        ?.dispatchEvent(new Event("submit"));
                    }}
                  >
                    {queryObj.query as string}
                  </button>
                </div>
              ) : null
            )
          ) : (
            <p className="text-gray-500 text-sm">No recent searches</p>
          )}
          <div className="text-md font-light self-start">Popular Searches</div>
        </div>
      </div>
    </main>
  );
};

export default SearchPopUp;
