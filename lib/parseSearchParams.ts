export const parseSearchParams = (pathQuery?: string, pathFilters?: string) => {
    if (!pathQuery && !pathFilters) { 
        return "";
    }
    const filters = pathFilters?.split(",") || [];
    const query = pathQuery?.split(" ").filter((term) => term.trim() !== "") || [];

    const searchConditions = [...new Set([...filters, ...query])].join(" ");

    console.log(`Search Conditions: ${searchConditions}`);
    return searchConditions;
    
}