"use client";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const query: string | undefined = searchParams.get("query") ?? undefined;
  return (
    <main className="root">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <Navbar query={query} />
      <div className="root-container">
        <Sidebar />
        <Mobilebar />
        <div className="root-container">{children}</div>
      </div>
      <Footer />
    </main>
  );
};

export default layout;
