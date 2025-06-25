import ProductCard from "@/components/ProductCard";
import { fetchHeartedProducts } from "@/lib/serverActions";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { ProductType } from "@/globalTypes";
import ContentTitle from "@/components/ContentTitle";
import { Suspense } from "react";
import { auth } from "@/auth";
import FiltersShort from "@/components/FiltersShort";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const experimental_ppr = true;

const Home = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || null;

  const path = (await params).slug || "/";

  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  let callbackUrl = path;

  // Add query parameters if they exist
  const queryParams = new URLSearchParams();
  if (filters) queryParams.set("f", filters);
  if (query) queryParams.set("query", query);

  if (queryParams.toString()) {
    callbackUrl += `?${queryParams.toString()}`;
  }

  let heartedProducts = [];
  if (userId) {
    heartedProducts = (await fetchHeartedProducts(userId)) || [];
  }
  const products = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProducts)
  );

  return (
    <main className="content-page">
      <Suspense fallback={<div>Filters...</div>}>
        <FiltersShort />
      </Suspense>

    <Suspense fallback={<div>Loading Title...</div>}>
      <ContentTitle />
      </Suspense>

      <div className="product-container overflow-y-auto scrollbar-hidden">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ul className="product-grid">
            {products.length > 0 ? (
              products.map((product: ProductType) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isHearted={heartedProducts.includes(product?._id)}
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
