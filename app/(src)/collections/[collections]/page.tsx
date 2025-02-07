import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { parseSearchParams } from "@/lib/parseSearchParams";

const page = async ({
  params,
  searchParams,
}: {
  params: { collections?: string };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const path = (await params).collections || "/";
  console.log(`Path: ${path}`);
  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  //const finalQuery = parseSearchParams(query, filters);
  const collectionProducts = await client.fetch(
    PAGE_QUERY(path, query, filters)
  );
  console.log(collectionProducts, null, 2);

  return (
    <div className="content-page">
      <div className="product-container">
        <ContentTitle />
        <ul className="product-grid">
          {collectionProducts.length > 0 ? (
            collectionProducts.map((product: ProductType) => (
              <ProductCard key={product?._id} product={product} />
            ))
          ) : (
            <div>No product available</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default page;
