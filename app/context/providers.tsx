"use client";
import { SessionProvider } from "next-auth/react";
import { CartSyncProvider } from "./CartSyncContext";
import { ContextProvider } from "./context";
import { BasketCountProvider } from "./BasketCountContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <BasketCountProvider>
      <CartSyncProvider>
        <ContextProvider>
            {children}
            <Toaster richColors />
        </ContextProvider>
      </CartSyncProvider>
      </BasketCountProvider>
    </SessionProvider>
  );
}