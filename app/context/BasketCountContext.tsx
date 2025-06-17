"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef} from 'react';
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
    const {data: session, status} = useSession();
    
    const refreshBasketCount = useCallback(async(optomisticUpdate: number) => {
      console.log("refreshBasketCount", optomisticUpdate);
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
      console.log("THIS IS STATUS", status);
      if (status === "unauthenticated") {
        console.log("REFRESHING BASKET COUNT ON SIGN OUT");
        refreshBasketCount(0);
      }
    }, [status]);
  
    // Initial load
    useEffect(() => {
      if (status === "loading") {
        console.log("REFRESHING BASKET COUNT ON INITIAL LOAD");
        refreshBasketCount(0);
      }
    }, [ status]);
  
    return (
      <BasketCountContext.Provider value={{basketCount, refreshBasketCount}}>
        {children}
      </BasketCountContext.Provider>
    );
};
