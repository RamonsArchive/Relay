import Form from "next/form";
import React from "react";
import SearchBarReset from "./SearchBarReset";
import { Search } from "lucide-react";

const SearchBarServer = ({ query }: { query?: string }) => {
  console.log(`Query in searchbarserver ${query}`);
  return (
    <Form action={"/"} className="search-form-popup">
      <button type="submit">
        <Search size="26px" className="cursor-pointer" />
      </button>

      <input
        name="query"
        className="search-input-popup"
        placeholder="Search..."
        defaultValue={query}
      ></input>
      <SearchBarReset />
    </Form>
  );
};

export default SearchBarServer;
