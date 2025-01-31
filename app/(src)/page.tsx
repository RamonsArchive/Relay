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

  const clothes = [
    {
      _createdAt: "today",
      title: "Flynit",
      brand: "Nike",
      _id: "1",
      description: "A nice pair of pants",
      gender: "male",
      kids: "",
      size: "xl",
      sale: "",
      colors: ["red", "blue"],
      categories: ["pants", "shoes", "running"],
      cost: 100,
    },
  ];
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <Navbar query={query} />
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <Mobilebar />
        <main className="home">
          <section className="home-container">
            <span className="font-plex-sans font-bold text-[30px]">
              All Clothes
            </span>
            <div className="home-grid"></div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
