"use client";
import { createContext, useContext, useState } from "react";
import {useEffect } from "react";
import { useSession } from "next-auth/react";
import { checkCartSync } from "@/sanity/lib/actions";
import { parseServerActionResponse } from "@/lib/utils";
import Cookies from "js-cookie";  
import { useBasketCount } from "./BasketCountContext";


export const CartSyncContext = createContext({});


export const CartSyncProvider = ({children}: {children: React.ReactNode}) => {
    const {data: session, status} = useSession();
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
    const {refreshBasketCount} = useBasketCount();


    useEffect(() => {
        const sync = async () => {
            if (status === "authenticated" && session?.user?.id) {
                
                try {
                    const userId = session?.user?.id;
                    const temp_cartId = Cookies.get("temp_cartId");
                    if (!userId || !temp_cartId || syncStatus !== "idle") {
                        return;
                    }
                    setSyncStatus("syncing");
                    const cartCheck = await checkCartSync(userId, temp_cartId || "");
                    if (cartCheck.status === "ERROR") {
                        setSyncStatus("error");
                        return parseServerActionResponse({
                            status: "ERROR",
                            error: "Failed to sync cart"
                        })
                    }
                    setSyncStatus("synced");
                    if (refreshBasketCount) {
                        await refreshBasketCount(0);
                      }

                    return parseServerActionResponse({
                        status: "SUCCESS",
                        error: "",
                        cart: cartCheck.cart
                    })
                } catch (error) {
                    console.error("Error syncing cart", error);
                    setSyncStatus("error");
                    return parseServerActionResponse({
                        status: "ERROR",
                        error: "Failed to sync cart"
                })
            }
        }
    }
        sync();
    }, [session, status, syncStatus]);

    useEffect(() => {
        if (status === "unauthenticated") {
            setSyncStatus("idle");
        }
    }, [status]);


    return (
        <CartSyncContext.Provider value={{syncStatus}}>
            {children}
        </CartSyncContext.Provider>
    )

}   

export const useCartSync = () => useContext(CartSyncContext)
