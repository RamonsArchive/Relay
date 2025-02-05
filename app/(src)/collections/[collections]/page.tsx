import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client } from "@/sanity/lib/client";
import { COLLECTION_PAGE_QUERY } from "@/sanity/lib/queries";

const page = async ({ params }: { params: { collections: string } }) => {
  let pathName = (await params).collections;
  console.log(`Pathname: ${pathName}`);
  const normalizedPath =
    pathName === "newarrivals"
      ? "new arrivals"
      : pathName === "bestsellers"
        ? "best sellers"
        : pathName;

  console.log(`Normalized path: ${normalizedPath}`);
  const collectionProducts = await client.fetch(
    COLLECTION_PAGE_QUERY(normalizedPath)
  );

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
