import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client, fetchHeartedProducts } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";
import { auth } from "@/auth";
import { ShoppingCart } from "lucide-react";
import FiltersShort from "@/components/FiltersShort";

const experimental_ppr = true;

const page = async ({
  params,
  searchParams,
}: {
  params: { collections?: string };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const sesson = await auth();
  const user = sesson?.user;
  const userId = user?.id || null;
  console.log("Collections User Id", userId);

  let heartedProducts = [];
  if (userId) {
    heartedProducts = await fetchHeartedProducts(userId);
  }
  const path = (await params).collections || "/";
  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  const fullPath = `/collections/${path}`;
  // Construct the base URL
  let callbackUrl = fullPath;

  // Add query parameters if they exist
  const queryParams = new URLSearchParams();
  if (filters) queryParams.set("f", filters);
  if (query) queryParams.set("query", query);

  if (queryParams.toString()) {
    callbackUrl += `?${queryParams.toString()}`;
  }

  const collectionProducts = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProducts)
  );

  return (
    <main className="content-page">
      <Suspense fallback={<div>Filters...</div>}>
        <FiltersShort />
      </Suspense>

      <ContentTitle />

      <div className="product-container">
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="product-grid">
            {collectionProducts.length > 0 ? (
              collectionProducts.map((product: ProductType) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isHearted={heartedProducts.includes(product?._id)}
                  user={user}
                  callbackUrl={callbackUrl}
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

export default page;
