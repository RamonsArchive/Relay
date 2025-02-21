import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client, fetchHeartedProducts } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";
import { auth } from "@/auth";

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
  const entirePath = await params;

  const heartedProductsIds = await fetchHeartedProducts(userId);
  console.log(`Hearted Products: ${heartedProductsIds}`);
  const path = (await params).collections || "/";
  console.log(`Path: ${path}`);
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

  console.log(`Callback URL: ${callbackUrl}`);

  const collectionProducts = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProductsIds)
  );
  console.log(collectionProducts, null, 2);

  return (
    <div className="content-page">
      <div className="product-container">
        <ContentTitle />
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="product-grid">
            {collectionProducts.length > 0 ? (
              collectionProducts.map((product: ProductType) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isHearted={heartedProductsIds.includes(product)}
                  user={userId}
                  currentUrl={callbackUrl}
                />
              ))
            ) : (
              <div>No product available</div>
            )}
          </ul>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
