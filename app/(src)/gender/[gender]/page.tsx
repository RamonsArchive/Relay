import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client, fetchHeartedProducts } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

const experimental_ppr = true;

const page = async ({
  params,
  searchParams,
}: {
  params: { gender?: string };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  //const user = await currentUser();
  //const userId = user ? user.id : "";
  const userId = "";
  const heartedProductsIds = await fetchHeartedProducts(userId);
  const path = (await params).gender || "/"; // ✅ Default to `/` if undefined
  console.log(`Path: ${path}`);
  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  //const finalQuery = parseSearchParams(query, filters);
  const genderProducts = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProductsIds)
  );
  console.log(genderProducts, null, 2);

  return (
    <div className="content-page">
      <div className="product-container">
        <ContentTitle />
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="product-grid">
            {genderProducts.length > 0 ? (
              genderProducts.map((product: ProductType) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isHearted={heartedProductsIds.includes(product)}
                  isAuth={userId}
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
