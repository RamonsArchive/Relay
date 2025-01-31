import Footer from "@/components/Footer";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SignIn, SignedOut } from "@clerk/nextjs";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  console.log(`Query in home ${query}`);
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <Navbar query={query} />
      <Sidebar />
      <Mobilebar />
      <Footer />
    </>
  );
};

export default Home;
