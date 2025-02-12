import ProductImages from "@/components/ProductImages";
import ProductSideImages from "@/components/ProductSideImages";
import { client } from "@/sanity/lib/client";
import { PRODUCT_IMAGE_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ path?: string }> }) => {
  const path = (await params).path;
  if (!path) {
    throw new Error("No path provided");
  }
  const images = await client.fetch(PRODUCT_IMAGE_QUERY(path));

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <ProductImages images={images} />
        </div>
      </Suspense>

      <div>Product Info</div>
    </main>
  );
};

export default page;
