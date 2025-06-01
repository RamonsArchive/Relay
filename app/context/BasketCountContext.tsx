/*"use client";
import { createContext, useContext, useState} from 'react';
import useSWR from 'swr';

type BasketCountContextType = {
    basketCount: number;
    setBasketCount: (count: number) => void;
}

const BasketCountContext = createContext<BasketCountContextType>({
    basketCount: 0,
    setBasketCount: () => {}
})

export const useBasketCount = () => {
    return useContext(BasketCountContext);
}

const BasketCountProvider = ({children}: {children: React.ReactNode}) => {
    const [basketCount, setBasketCount] = useState(0);


    return (
        <BasketCountContext.Provider value={{basketCount, setBasketCount}}>
            {children}
        </BasketCountContext.Provider>
    )
}*/