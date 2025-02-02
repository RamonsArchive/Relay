import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { ProductType } from "@/globalTypes";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const products = await client.fetch(PRODUCTS_QUERY);

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
            <ul className="home-grid">
              {products.length > 0 ? (
                products.map((product: ProductType) => (
                  <ProductCard key={product?._id} product={product} />
                ))
              ) : (
                <div>No product available</div>
              )}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
