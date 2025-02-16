import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { ContextProvider } from "@/app/context/context";
import React from "react";
import SidebarWrapper from "@/components/SidebarWrapper";

const layout = async ({ children }: { children: React.ReactNode }) => {
  /*<SignedOut>
        <SignIn />
      </SignedOut> */
  return (
    <main className="root">
      <ContextProvider>
        <Navbar />
        <div className="root-container">
          <SidebarWrapper />
          <div className="root-container">{children}</div>
        </div>
      </ContextProvider>
      <Footer />
    </main>
  );
};

export default layout;
