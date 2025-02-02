import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY, SEARCH_QUERY } from "@/sanity/lib/queries";

import { ProductType } from "@/globalTypes";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  console.log(`Query from search bar: ${query}`);

  const products = await client.fetch(SEARCH_QUERY(query));
  console.log(products[0]);

  return (
    <>
      <main className="home">
        <div className="home-container">
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
        </div>
      </main>
    </>
  );
};

export default Home;
