import ProductImages from "@/components/ProductImages";
import { client, fetchHeartedProducts, urlFor } from "@/sanity/lib/client";
import {
  GET_DEREFERENCED_RECENTLY_VIEWED_PRODUCTS,
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
import ProductCard from "@/components/ProductCard";
import { ProductType, ReviewStatsType, ReviewType } from "@/globalTypes";
import { after } from "next/server";
import { ReviewSliderStats, parseServerActionResponse } from "@/lib/utils";

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: { id: string } }) => {
  const sesson = await auth();
  const user = sesson?.user;
  const userId = user?.id || null;
  console.log(" Product User Id", userId);
  const path = (await params).id || "/";
  console.log("path", path);
  const productId = path.toString();
  console.log("type of produt id", typeof productId);
  console.log("Should be prdouct id", productId);
  const callbackUrl = `/product/${path}`;
  if (!path) {
    throw new Error("No path provided");
  }

  console.log(`Path in product page: ${path}`);
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const imagesPlusProductDetails = await client.fetch(
    PRODUCT_PAGE_INFORMATION(productId)
  );
  // console.log("Imageplus", imagesPlusProductDetails);

  const {
    title,
    stock,
    cost,
    description,
    materials,
    mainImage,
    brands,
    collections,
    categories,
    mainDetails,
    detailBullets,
    reviews,
  } = imagesPlusProductDetails;

  console.log("Title", title);
  console.log("cost", cost);

  let dereferencedReviews = reviews || [];
  let recentlyViewedProds = [];
  let heartedProducts = [];
  let userReview = [];
  const reviewStats = ReviewSliderStats(reviews);

  if (userId) {
    try {
      const query = await GET_DEREFERENCED_RECENTLY_VIEWED_PRODUCTS();
      recentlyViewedProds = await client
        .withConfig({ useCdn: false })
        .fetch(query, {
          userId,
        });
      recentlyViewedProds = recentlyViewedProds.recentlyViewedProducts;

      recentlyViewedProds = recentlyViewedProds.filter(
        (prod: ProductType) => prod._id != productId
      );
      heartedProducts = await fetchHeartedProducts(userId);

      if (dereferencedReviews?.length > 0) {
        userReview = dereferencedReviews.filter(
          (review: ReviewType) => review?.user?._id === userId
        );
        dereferencedReviews = dereferencedReviews.filter(
          (review: ReviewType) => review?.user?._id !== userId
        );
      }
    } catch (error) {
      console.error(error);
      console.log("There was an error");
      return parseServerActionResponse({
        status: "ERROR",
      });
    }

    console.log("After usrId");

    after(() => {
      const callback = async () => {
        try {
          await handleRecentyViewedProductsWrite(productId, userId);
          await writePopularCategories(userId, productId, categories);
        } catch (error) {
          console.error(error);
          return parseServerActionResponse({
            status: "ERROR",
            error: "Internal server error",
          });
        }
      };
      callback();
    });
  }

  let selectedReviews = [];

  console.log("right before derefenced reviews");
  if (dereferencedReviews?.length >= 3) {
    console.log("more than three reviews");
    const sortedReviews = [...dereferencedReviews].sort(
      (a, b) =>
        b.mainRating - a.mainRating ||
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );

    if (userReview.length === 0) {
      const best = sortedReviews.slice(0, 2);
      const worst = sortedReviews.slice(-1);
      selectedReviews = [...best, ...worst];
    } else {
      const best = sortedReviews.slice(0, 1);
      const worst = sortedReviews.slice(-1);
      selectedReviews = [...userReview, ...best, ...worst];
    }
  } else {
    console.log("less than three reivews");
    if (!dereferencedReviews?.length) {
      console.log("Returning cause no reviews");
      selectedReviews = [];
    }
    const sortedReviews = [...dereferencedReviews].sort(
      (a, b) =>
        b.mainRating - a.mainRating ||
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    if (userReview.length === 0) {
      selectedReviews = [...sortedReviews];
    } else {
      selectedReviews = [...userReview, ...sortedReviews];
    }
  }

  const parsedDescription = md.render(description);

  const capitalizeBrand = (brand: any) => {
    const newBrand = brand?.name
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return newBrand;
  };

  /* TODO: Use useActionState to handle the button clicks */
  return (
    <div className="flex flex-col max-w-screen">
      <div className="product-page-wrapper">
        <div className="product-page">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="product-page-image-container">
              <ProductImages images={imagesPlusProductDetails} />
            </div>
          </Suspense>

          <div className="flex flex-col w-full overflow-y-auto">
            <div className="flex flex-col pl-5 gap-y-5 w-[90%]">
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
                          productId.toString()
                        )}
                        productId={productId}
                        userId={userId}
                        callbackUrl={callbackUrl}
                      />
                    </div>
                  </Suspense>
                </div>
                <div className="flex flex-col">
                  <p className="font-plex-sans font-bold text-[28px]">
                    {title}
                  </p>
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
                <p className="font-plex-sans font-regular text-[16px]">
                  ${cost}
                </p>
              </div>
              <div className="w-full pt-2">
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
              <div className="flex w-full pt-10">
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
              <div className="flex flex-col w-full gap-4 pt-5">
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
                  selectedReviews={selectedReviews}
                  userReview={userReview[0]}
                  userId={userId}
                  productId={productId}
                  mainImage={mainImage}
                  title={title}
                  cost={cost}
                  reviewStats={reviewStats}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-0">
        <p className="font-plex-sans font-medium text-[30px] pl-5">
          Recently Viewed Products
        </p>
        <div className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap h-[475px]">
          <div className="flex flex-nowrap w-max gap-5 min-h-[375px] p-5">
            <Suspense fallback={<div>Loading products... </div>}>
              {recentlyViewedProds?.length > 0 ? (
                recentlyViewedProds
                  .slice(0, 10)
                  .map((product: any, index: number) => {
                    return (
                      <ProductCard
                        key={index}
                        product={product}
                        isHearted={product?._id.includes(productId)}
                        callbackUrl={callbackUrl}
                        user={user}
                      />
                    );
                  })
              ) : (
                <div>No recently viewed products</div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
