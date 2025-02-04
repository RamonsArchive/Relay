"use client";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";

/* Context for checkboxes in my filters closes filters after search and on homepage*/
export const FilterContext = createContext<{
  checkedFilters: Record<string, boolean>;
  setCheckedFilters: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}>({
  checkedFilters: {},
  setCheckedFilters: () => {},
});

const layout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const query: string | undefined = searchParams.get("query") ?? undefined;

  const [checkedFilters, setCheckedFilters] = useState<Record<string, boolean>>(
    {}
  );
  useEffect(() => {
    console.log("Query in LAYOUT" + query);
    if (!query) {
      setCheckedFilters({});
    }
  }, [query]);

  return (
    <FilterContext.Provider value={{ checkedFilters, setCheckedFilters }}>
      <main className="root">
        <SignedOut>
          <SignIn />
        </SignedOut>
        <Navbar query={query} />
        <div className="root-container">
          <Sidebar query={query} />
          <Mobilebar />
          <div className="root-container">{children}</div>
        </div>
        <Footer />
      </main>
    </FilterContext.Provider>
  );
};

export default layout;
