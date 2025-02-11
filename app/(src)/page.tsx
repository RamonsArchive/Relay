import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { ShoppingCart } from "lucide-react";
import { parseSearchParams } from "@/lib/parseSearchParams";
import { ProductType } from "@/globalTypes";
import ContentTitle from "@/components/ContentTitle";
import { Suspense } from 'react'


export const experimental_ppr = true;

const Home = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const path = params.slug || "/"; // ✅ Default to `/` if undefined
  console.log(`Path: ${path}`);
  /*const pathArray = params.slug || undefined;
  console.log(`Path Array: ${pathArray}`);
  const path = pathArray ? `${pathArray.join("/")}` : "/"; */

  console.log(`Path: ${path}`);
  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  console.log(`Path: ${path}`);
  console.log(`Query: ${query}`);
  console.log(`Filters: ${filters}`);

  //const finalQuery = parseSearchParams(query, filters);
  const products = await client.fetch(PAGE_QUERY(path, query, filters), { revalidate: 0});
  console.log(products, null, 2);

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
          <Suspense fallback={<div>Loading...</div>}>
          <ul className="product-grid">
            {products.length > 0 ? (
              products.map((product: ProductType) => (
                
                <ProductCard key={product?._id} product={product} />
                
              ))
            ) : (
              <div>No product available</div>
            )}
            
          </ul>
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Home;
