import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/app/context/context";
import React from "react";
import SidebarWrapper from "@/components/SidebarWrapper";
import { Toaster } from "sonner";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <ContextProvider>
        <Navbar />
        <div className="root-container">
          <SidebarWrapper />

          <div className="content-wrapper">
            <div className="content-container">{children}</div>
          </div>
        </div>
        <div className="footer-wrapper">
          <Footer />
        </div>
        <Toaster richColors />
      </ContextProvider>
    </main>
  );
};

export default layout;
