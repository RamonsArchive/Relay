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
import { CircleX, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/context";
import { useSearchParams } from "next/navigation";

// TODO: Implement RECENTS

interface Props {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchPopUp = ({ setClicked }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";


  const [inputValue, setInputValue] = useState("");

  const { setCheckedFilters, setSelectedFilters, setDroppedFilters } =
    useContext(Context);
  const oldQuery = useRef<string | undefined>(query);

  useEffect(() => {
    if (query && query !== oldQuery.current) {
      setClicked(false);
      setInputValue("");
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
    oldQuery.current = query;
  }, [query]);

  const handleFromSubmit = async (prevState: any, formData: FormData) => {
    try {
      const query = formData.get("query")?.toString().trim() || undefined;
      if (!query) {
        return;
      }
      router.push(`/?query=${encodeURIComponent(query).toLowerCase()}`);
      setCheckedFilters({});
      setSelectedFilters([]);
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
    <main className="search-popup-container">
      <div className="grid grid-cols-3 items-center w-full relative">
        <div className="flex justify-self-start self-start">
          <Link href="/">
            <Image
              src="/assets/logo/logo-png.png"
              alt="logo"
              width={60}
              height={40}
            />
          </Link>
        </div>

        <div className="flex flex-col justify-center">
          <Form action={formAction} className="search-form-popup">
            <button type="submit">
              <Search size="26px" className="cursor-pointer" />
            </button>

            <input
              name="query"
              className="search-input-popup"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <SearchBarReset />
          </Form>
          <div className="flex flex-col justify-center items-center w-full mt-4 gap-y-10">
            <div className="text-md font-light self-start">Recent Searches</div>
            <div className="text-md font-light self-start">
              Popular Searches
            </div>
          </div>
        </div>

        <div className="flex justify-self-end self-start">
          <CircleX
            size="34px"
            className="cursor-pointer"
            strokeWidth={1.3}
            onClick={() => setClicked(false)}
          />
        </div>
      </div>
    </main>
  );
};

export default SearchPopUp;
