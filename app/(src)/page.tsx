import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { SEARCH_QUERY } from "@/sanity/lib/queries";
import { ShoppingCart } from "lucide-react";

import { ProductType } from "@/globalTypes";
import ContentTitle from "@/components/ContentTitle";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  console.log(`Query from search bar: ${query}`);

  const products = await client.fetch(SEARCH_QUERY(query));

  return (
    <>
      <main className="home">
        <div className="absolute top-5 right-5 ">
          <div className="cart-background">
            <ShoppingCart size={36} className="text-white" />
          </div>
        </div>
        <div className="product-container">
          <ContentTitle />
          <ul className="product-grid">
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
