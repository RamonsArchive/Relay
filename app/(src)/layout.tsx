import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { ContextProvider } from "@/app/context/context";
import React from "react";
import SidebarWrapper from "@/components/SidebarWrapper";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ path: string[] }>;
}) => {
  const path = (await params).path;
  const isProductPage = path?.[0] === "product";
  console.log("Path", path);
  return (
    <main className="root">
      <SignedOut>
        <SignIn />
      </SignedOut>
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
