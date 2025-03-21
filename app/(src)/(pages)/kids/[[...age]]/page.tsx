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
  params: { age?: string[] };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const sesson = await auth();
  const user = sesson?.user;
  const userId = user?.id || null;

  const pathArray = (await params).age || [];
  console.log(`Path Array: ${pathArray}`);
  const path = ["kids", ...pathArray].join("/");
  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  // if I get boys and girls pages edit this to be more dynamic
  const fullPath = `/kids`;
  // Construct the base URL
  let callbackUrl = fullPath;
  // Add query parameters if they exist
  const queryParams = new URLSearchParams();
  if (filters) queryParams.set("f", filters);
  if (query) queryParams.set("query", query);

  if (queryParams.toString()) {
    callbackUrl += `?${queryParams.toString()}`;
  }

  //const finalQuery = parseSearchParams(query, filters);
  let heartedProducts = [];
  if (userId) {
    heartedProducts = await fetchHeartedProducts(userId);
  }
  const genderProducts = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProducts)
  );

  return (
    <div className="content-page">
      <Suspense fallback={<div>Filters...</div>}>
        <FiltersShort />
      </Suspense>

      <ContentTitle />

      <div className="product-container">
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="product-grid">
            {genderProducts.length > 0 ? (
              genderProducts.map((product: ProductType) => (
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
    </div>
  );
};

export default page;
