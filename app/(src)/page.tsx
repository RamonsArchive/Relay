import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { ShoppingCart } from "lucide-react";
import { ProductType } from "@/globalTypes";
import ContentTitle from "@/components/ContentTitle";
import { Suspense } from "react";
import { fetchHeartedProducts } from "@/sanity/lib/client";
import { auth } from "@/auth";

export const experimental_ppr = true;

const Home = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Promise<{ query?: string; f?: string }>;
}) => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id || null;

  const path = params.slug || "";
  console.log(`Path: ${path}`);

  const query = (await searchParams).query || "";
  const filters = (await searchParams).f || "";

  const heartedProductsIds = await fetchHeartedProducts(userId);
  const products = await client.fetch(
    PAGE_QUERY(path, query, filters, heartedProductsIds)
  );
  console.log(products, null, 2);

  return (
    <>
      <main className="home">
        <div className="absolute top-5 right-5 ">
          <div className="cart-background">
            <ShoppingCart size={36} className="text-white" />
          </div>
        </div>
        <div className="product-container">
          <ContentTitle />
          <Suspense fallback={<div>Loading...</div>}>
            <ul className="product-grid">
              {products.length > 0 ? (
                products.map((product: ProductType) => (
                  <ProductCard
                    key={product?._id}
                    product={product}
                    isHearted={heartedProductsIds.includes(product)}
                    user={user}
                  />
                ))
              ) : (
                <div>No product available</div>
              )}
            </ul>
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Home;
