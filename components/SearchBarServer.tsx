import Form from "next/form";
import SearchBarReset from "./SearchBarReset";
import { Search } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

/*  TODO: RESET SEARCH QUERY AFTER A SUBMIT AND ALSO CALL THE NEW GROQ FROM SERACH */

const SearchBarServer = ({ query }: { query?: string }) => {
  const router = useRouter();
  const handleFromSubmit = async (prevState: any, formData: FormData) => {
    console.log(`Query from search bar: ${formData.get("query")}`);
    try {
      const query = formData.get("query")?.toString().trim() || undefined;
      if (!query) {
        return;
      }
      router.push(`/?query=${encodeURIComponent(query).toLowerCase()}`);
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
    <Form action={formAction} className="search-form-popup">
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
