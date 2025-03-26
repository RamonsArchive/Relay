import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/app/context/context";
import React, { Suspense } from "react";
import SidebarWrapper from "@/components/SidebarWrapper";
import { Toaster } from "sonner";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <ContextProvider>
        <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        </Suspense>
        <div className="root-container">
          <Suspense fallback={<div>Loading...</div>}>
          <SidebarWrapper />
          </Suspense>

          <div className="content-wrapper">
            <div className="content-container">{children}</div>
          </div>
        </div>
        <div className="footer-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
          <Footer />
          </Suspense>
        </div>
        <Toaster richColors />
      </ContextProvider>
    </main>
  );
};

export default layout;
