import React from "react";
import ContentTitle from "@/components/ContentTitle";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/globalTypes";
import { client } from "@/sanity/lib/client";
import { KIDS_PAGE_QUERY } from "@/sanity/lib/queries";

/*TODO: test if this works with the filters */
const page = async ({ params }: { params: { age: string } }) => {
  let pathName = (await params).age;
  if (pathName === undefined) {
    pathName = "/";
  } else {
    pathName = pathName.split("/").filter(Boolean).pop() || "";
  }
  const genderProducts = await client.fetch(KIDS_PAGE_QUERY(pathName));

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
