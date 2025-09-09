"use client";
import { createContext, useContext, useState, useEffect, useCallback} from 'react';
import { parseServerActionResponse } from "@/lib/utils";
import { useSession } from 'next-auth/react';


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
    const {data: _, status} = useSession();
    
    const refreshBasketCount = useCallback(async(optomisticUpdate: number) => {
      try {
        if (optomisticUpdate) {
          setBasketCount(prev => prev + optomisticUpdate);
        }
        const res = await fetch("/api/cart/count");
        const data = await res.json();
        setBasketCount(data.count || 0);
        
        return parseServerActionResponse({
          status: "SUCCESS",
          count: data.count || 0 
        });
      } catch (error) {
        console.error("Error refreshing basket count", error);
        setBasketCount(0);
      }
    }, []);
  
    // Only handle sign out and initial load
    useEffect(() => {
      if (status === "unauthenticated") {
        refreshBasketCount(0);
      }
    }, [status]);
  
    // Initial load
    useEffect(() => {
      if (status === "loading") {
        refreshBasketCount(0);
      }
    }, [ status]);
  
    return (
      <BasketCountContext.Provider value={{basketCount, refreshBasketCount}}>
        {children}
      </BasketCountContext.Provider>
    );
};
