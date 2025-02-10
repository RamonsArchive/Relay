
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { ContextProvider } from "@/app/context/context";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <main className="root">
        <SignedOut>
          <SignIn />
        </SignedOut>
        <ContextProvider>
        <Navbar />
        <div className="root-container">
          <Sidebar />
          <Mobilebar />
          <div className="root-container">{children}</div>
        </div>
        </ContextProvider>
        <Footer />
      </main>
      
  );
};

export default layout;
