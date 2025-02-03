import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client } from "@/sanity/lib/client";
import { GENDER_PAGE_QUERY } from "@/sanity/lib/queries";

const page = async ({ params }: { params: { gender: string } }) => {
  const pathName = (await params).gender;
  const genderProducts = await client.fetch(GENDER_PAGE_QUERY(pathName));

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
