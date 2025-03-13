import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { ShoppingCart } from "lucide-react";
import { ProductType } from "@/globalTypes";
import ContentTitle from "@/components/ContentTitle";
import { Suspense } from "react";
import { fetchHeartedProducts } from "@/sanity/lib/client";
import { auth } from "@/auth";

export const experimental_ppr = true;

const Home = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || null;
  console.log("Home page User Id", userId);

  const path = params.slug || "/";
  console.log(`Path: ${path}`);

  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";
  console.log(`Query: ${query}`);
  console.log(`Filters: ${filters}`);

  let callbackUrl = path;

  // Add query parameters if they exist
  const queryParams = new URLSearchParams();
  if (filters) queryParams.set("f", filters);
  if (query) queryParams.set("query", query);

  if (queryParams.toString()) {
    callbackUrl += `?${queryParams.toString()}`;
  }

  const heartedProductsIds = await fetchHeartedProducts(userId);
  const products = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProductsIds)
  );

  return (
    <main className="content-page">
      <div className="flex flex-1 p-5">
        <div className="absolute top-5 right-5">
          <div className="cart-background">
            <ShoppingCart size={36} className="text-white" />
          </div>
        </div>
        <ContentTitle />
      </div>
      <div className="product-container overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="product-grid">
            {products.length > 0 ? (
              products.map((product: ProductType) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isHearted={heartedProductsIds.includes(product?._id)}
                  callbackUrl={callbackUrl}
                  user={user}
                />
              ))
            ) : (
              <div>No product available</div>
            )}
          </ul>
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
