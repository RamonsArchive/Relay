import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const query = (await searchParams).query;
  return (
    <>
      <Navbar query={query} />
      <main>
        {" "}
        <Sidebar />
        <Mobilebar />
      </main>
    </>
  );
};

export default page;
