"use client";
import { createContext, useContext, useState, useEffect, useCallback} from 'react';
import { parseServerActionResponse } from "@/lib/utils";


type BasketCountContextType = {
    basketCount: number;
    refreshBasketCount: (optomisticUpdate: number) => Promise<void>;
}

export const BasketCountContext = createContext<BasketCountContextType>({
    basketCount: 0,
    refreshBasketCount: async () => {}
})

export const useBasketCount = () => {
    return useContext(BasketCountContext);
}

export const BasketCountProvider = ({children}: {children: React.ReactNode}) => {
    const [basketCount, setBasketCount] = useState(0);

    const refreshBasketCount = useCallback(async(optomisticUpdate: number) => {
        console.log("refreshBasketCount", optomisticUpdate);
        try {
          if (optomisticUpdate) {
            setBasketCount(prev => prev + optomisticUpdate);
          }
          const res = await fetch("/api/cart/count", {next: {tags: ['cart-count']}});
          console.log("res", res);
          const data = await res.json();
          console.log("data", data);
          const count = data.count;
          console.log(" count", count)
          if (!res.ok) {
            setBasketCount(prev => prev - optomisticUpdate || 0);
            return parseServerActionResponse({
                status: "ERROR",
                error: "Failed to refresh basket count"
            })

          }
          setBasketCount(count || 0);

        return parseServerActionResponse({
            status: "SUCCESS",
            error: "",
            data: {
                count: count || 0
            }
         })
         
        } catch (error) {
            console.error("Error refreshing basket count", error);
            setBasketCount(0);
        }
    }, [])

    // on initial load, refresh the basket count
    useEffect(() => {
        refreshBasketCount(0);
    }, [refreshBasketCount])

    return (
        <BasketCountContext.Provider value={{basketCount, refreshBasketCount}}>
            {children}
        </BasketCountContext.Provider>
    )
}