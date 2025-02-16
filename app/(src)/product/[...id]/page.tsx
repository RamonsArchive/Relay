import ProductImages from "@/components/ProductImages";
import { client } from "@/sanity/lib/client";
import {
  GET_TOP_REVIEWS,
  PRODUCT_PAGE_INFORMATION,
} from "@/sanity/lib/queries";
import { Suspense } from "react";
import markdownit from "markdown-it";
import ProductDetailsDrop from "@/components/ProductDetailsDrop";

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: { id: string } }) => {
  const path = params.id || "/";
  console.log(`Path in product page: ${path}`);
  if (!path) {
    throw new Error("No path provided");
  }

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const imagesPlusProductDetails = await client.fetch(
    PRODUCT_PAGE_INFORMATION(path as string)
  );

  const topReviews = await client.fetch(GET_TOP_REVIEWS(path as string));
  console.log(`Top Reviews: ${topReviews.reviews}`);

  const {
    title,
    stock,
    cost,
    size,
    description,
    materials,
    brand,
    collections,
    categories,
    mainDetails,
    detailBullets,
    reviews,
  } = imagesPlusProductDetails;

  const productDetails = {
    title,
    stock,
    cost,
    size,
    description,
    materials,
    brand,
    categories,
    collections,
    mainDetails,
    detailBullets,
    reviews,
  };

  console.log(`Main details: ${typeof mainDetails}`);
  console.log(`Detail bullets: ${typeof detailBullets}`);
  console.log(`Reviews: ${reviews[0].sizeRating}`);

  const parsedDescription = md.render(description);

  const capitalizeBrand = (brand: string) => {
    const newBrand = brand[0]
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    console.log(newBrand);
    return newBrand;
  };

  /* TODO: Use useActionState to handle the button clicks */
  return (
    <main className="product-page">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="product-page-image-container">
          <ProductImages images={imagesPlusProductDetails} />
        </div>
      </Suspense>

      <div className="flex flex-col w-full overflow-y-auto">
        <div className="flex flex-col pl-5 gap-y-2 w-full">
          <div className="font-plex-sans font-bold text-[28px]">
            <p>{capitalizeBrand(brand)}</p>
            <p>{title}</p>
          </div>
          <div>
            <p className="font-plex-sans font-regular text-[16px]">${cost}</p>
          </div>
          <div className="w-[75%] pt-2">
            <div className="product-sizebutton-grid ">
              {allSizes.map((size: string, index: number) => {
                const stockItem = stock.find(
                  (item: any) => item.size === size.toLowerCase()
                );
                const isAvaliable = stockItem?.quantity > 0;

                return (
                  <button
                    className={`h-[50p]x w-[65px] border-rounded-[10px] ${isAvaliable ? "border-[1px] border-third-200" : " border-[1px] border-thrid-200 bg-secondary-300"}`}
                    key={index}
                    disabled={!isAvaliable}
                  >
                    <span>{size}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex w-[75%] pt-10">
            <h3 className="">
              {parsedDescription ? (
                <article
                  className="prose font-plex-sans font-regular text-[20px]"
                  dangerouslySetInnerHTML={{ __html: parsedDescription }}
                />
              ) : (
                <p className="font-plex-sans font-regular text-[20px]">
                  No description available
                </p>
              )}
            </h3>
          </div>
          <div className="flex flex-col w-[90%] gap-4 pt-5">
            <button className="product-buy-buttons bg-primary-200 text-white">
              Add to Cart
            </button>
            <button className="product-buy-buttons bg-secondary-200">
              Purchase Now
            </button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetailsDrop
              mainDetails={mainDetails}
              detailBullets={detailBullets}
              reviews={reviews}
              topReviews={topReviews.reviews}
              productId={path}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default page;
