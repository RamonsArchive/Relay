import ProductImages from "@/components/ProductImages";
import {
  client,
  fetchHeartedProducts,
  fetchRecentyViewedProducts,
  urlFor,
} from "@/sanity/lib/client";
import {
  GET_TOP_REVIEWS,
  PRODUCT_PAGE_INFORMATION,
} from "@/sanity/lib/queries";
import { Suspense } from "react";
import markdownit from "markdown-it";
import ProductDetailsDrop from "@/components/ProductDetailsDrop";
import { auth } from "@/auth";
import {
  handleRecentyViewedProductsWrite,
  writePopularCategories,
} from "@/sanity/lib/actions";
import Image from "next/image";
import ProductHeart from "@/components/ProductHeart";

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: { id: string } }) => {
  const sesson = await auth();
  const user = sesson?.user;
  const userId = user?.id || null;
  const path = (await params).id || "/";
  const productIdString = path.toString();
  const callbackUrl = `/product/${path}`;
  if (!path) {
    throw new Error("No path provided");
  }

  console.log(`Path in product page: ${path}`);
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const imagesPlusProductDetails = await client.fetch(
    PRODUCT_PAGE_INFORMATION(path as string)
  );

  const {
    title,
    stock,
    cost,
    description,
    materials,
    brands,
    collections,
    categories,
    mainDetails,
    detailBullets,
    reviews,
  } = imagesPlusProductDetails;

  console.log("Categories: ", categories);
  console.log("Images and product details: ", imagesPlusProductDetails);
  let getRecentyViewedProducts = null;
  let addRecentlyViewdProducts = null;
  let heartedProducts = [];
  console.log("User ID: ", userId);
  if (userId) {
    getRecentyViewedProducts = await fetchRecentyViewedProducts(userId);
    addRecentlyViewdProducts = await handleRecentyViewedProductsWrite(
      productIdString,
      userId,
      getRecentyViewedProducts
    );
    heartedProducts = await fetchHeartedProducts(userId);
    console.log("Categories: ", categories);
    writePopularCategories(userId, productIdString, categories);
  }

  console.log("Hearted products: ", heartedProducts);

  const topReviews = await client.fetch(GET_TOP_REVIEWS(path as string));
  console.log(`Top Reviews: ${topReviews.reviews}`);

  const parsedDescription = md.render(description);

  const capitalizeBrand = (brand: any) => {
    console.log("Brand", brand);
    const newBrand = brand?.name
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
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

      <div className="flex flex-col w-full overflow-y-auto ">
        <div className="flex flex-col pl-5 gap-y-5 w-full">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-5 font-plex-sans font-bold text-[20px] items-center">
                <Image
                  src={urlFor(brands[0]?.logo).url()}
                  alt="brand logo"
                  width={80}
                  height={50}
                  className="object-contain w-12 h-12"
                />
                <p>{capitalizeBrand(brands[0])}</p>
              </div>
              <Suspense fallback={<div>Heart</div>}>
                <div className="pr-5">
                  <ProductHeart
                    isHearted={heartedProducts?.includes(
                      productIdString.toString()
                    )}
                    productIdString={productIdString}
                    userId={userId}
                    callbackUrl={callbackUrl}
                  />
                </div>
              </Suspense>
            </div>
            <div className="flex flex-col">
              <p className="font-plex-sans font-bold text-[28px]">{title}</p>
              {categories &&
                categories.length > 0 &&
                categories.map((obj: any, index: number) => (
                  <p
                    key={index}
                    className="font-plex-sans font-regular text-[18px]"
                  >
                    {obj.name}
                  </p>
                ))}
            </div>
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
