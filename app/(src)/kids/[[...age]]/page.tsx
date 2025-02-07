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
  params: { age?: string[] };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const pathArray = (await params).age || [];
  console.log(`Path Array: ${pathArray}`);
  const path = ["kids", ...pathArray].join("/");
  console.log(`Path: ${path}`);
  const query = (await searchParams).query || "";
  console.log(`Query: ${query}`);
  const filters = (await searchParams).f || "";

  //const finalQuery = parseSearchParams(query, filters);
  const genderProducts = await client.fetch(PAGE_QUERY(path, query, filters));
  console.log(genderProducts, null, 2);

  return (
    <div className="content-page">
      <div className="product-container">
        <ContentTitle />
        <ul className="product-grid">
          {genderProducts.length > 0 ? (
            genderProducts.map((product: ProductType) => (
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
