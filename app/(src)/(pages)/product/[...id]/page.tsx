import ProductImages from "@/components/ProductImages";
import { fetchHeartedProducts } from "@/lib/serverActions";
import { client, urlFor } from "@/sanity/lib/client";
import {
  GET_DEREFERENCED_RECENTLY_VIEWED_PRODUCTS,
  GET_USER_FLAGGED_REVIEWS,
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
import {
  ProductType,
  ReviewType,
  BrandType,
  CategoryType,
} from "@/globalTypes";
import { after } from "next/server";
import { ReviewSliderStats, parseServerActionResponse } from "@/lib/utils";
import AutoFlagReviewWrapper from "@/components/AutoFlagReviewWrapper";
import MobileProductImages from "@/components/MobileProductImages";
import ProductSizeButtons from "@/components/ProductSizeButtons";
import ProductBuyButtons from "@/components/ProductBuyButtons";
import ProductOptionsProvider from "@/app/context/ProductOptionsContext";
import ProductColorButtons from "@/components/ProductColorButtons";
import ProductQuantity from "@/components/ProductQuantity";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const sesson = await auth();
  const user = sesson?.user;
  const userId = user?.id || null;
  const path = (await params).id || "/";
  const productId = path.toString();
  const callbackUrl = `/product/${path}`;
  if (!path) {
    throw new Error("No path provided");
  }

  const imagesPlusProductDetails = await client.fetch(
    PRODUCT_PAGE_INFORMATION(productId)
  );

  const {
    title,
    variants,
    cost,
    description,
    mainImage,
    brands,
    categories,
    mainDetails,
    detailBullets,
    reviews,
  } = imagesPlusProductDetails;

  const imageMain = mainImage;
  const galleryImages = imagesPlusProductDetails.imageGallery;

  let dereferencedReviews = reviews || [];
  let recentlyViewedProds = [];
  let heartedProducts = [];
  let userReview = [];
  let flaggedReviews = [];
  const reviewStats = ReviewSliderStats(reviews);

  const cookieJar = await cookies();
  const temp_cartId = cookieJar.get("temp_cartId")?.value || "";

  if (userId) {
    try {
      const query = await GET_DEREFERENCED_RECENTLY_VIEWED_PRODUCTS();
      recentlyViewedProds = await client
        .withConfig({ useCdn: false })
        .fetch(query, {
          userId,
        });
      recentlyViewedProds = recentlyViewedProds.recentlyViewedProducts;

      if (recentlyViewedProds && recentlyViewedProds.length > 0) {
        recentlyViewedProds = recentlyViewedProds.filter(
          (prod: ProductType) => prod._id != productId
        );
      }

      heartedProducts = await fetchHeartedProducts(userId);

      if (dereferencedReviews?.length > 0) {
        userReview = dereferencedReviews.filter(
          (review: ReviewType) => review?.user?._id === userId
        );
        dereferencedReviews = dereferencedReviews.filter(
          (review: ReviewType) => review?.user?._id !== userId
        );
      }

      const flagQuery = GET_USER_FLAGGED_REVIEWS();
      flaggedReviews = await client
        .withConfig({ useCdn: false })
        .fetch(flagQuery, { userId }, { next: { tags: ["flagged-reviews"] } });
    } catch (error) {
      console.error(error);
      return parseServerActionResponse({
        status: "ERROR",
      });
    }

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

  if (dereferencedReviews?.length >= 3) {
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
    if (!dereferencedReviews?.length) {
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

  const capitalizeBrand = (brand: BrandType) => {
    const newBrand = (brand?.name as string)
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return newBrand;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductOptionsProvider>
        <AutoFlagReviewWrapper userId={userId} />
        <div className="hidden md:flex md:flex-col max-w-screen pt-[4rem] md:pt-[0]">
          <div className="flex flex-row w-full mt-5">
            <div className="flex w-[60%] pr-5">
              <Suspense fallback={<div>Loading...</div>}>
                <ProductImages
                  imageMain={imageMain}
                  galleryImages={galleryImages}
                />
              </Suspense>
            </div>

            <div className="flex flex-col w-[40%] h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hidden scroll-smooth">
              <div className="flex flex-col pl-3 lg:pl-5 gap-y-3 w-[90%] overflow-y-auto scrollbar-hidden overflow-x-hidden">
                <div className="flex justify-between items-center">
                  <div className="flex gap-5 font-plex-sans font-bold text-[20px] items-center">
                    <img
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
                    categories.map((obj: CategoryType, index: number) => (
                      <p
                        key={index}
                        className="font-plex-sans font-regular text-[18px]"
                      >
                        {obj.name}
                      </p>
                    ))}
                </div>

                <div>
                  <p className="font-plex-sans font-regular text-[16px]">
                    ${cost}
                  </p>
                </div>
                <div className="flex w-full pt-10">
                  {parsedDescription ? (
                    <article
                      className="prose font-plex-sans font-regular text-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: parsedDescription,
                      }}
                    />
                  ) : (
                    <p className="font-plex-sans font-regular text-[20px]">
                      No description available
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full pt-5">
                  <p className="font-plex-sans font-medium text-[18px] lg:text-[20px]">
                    Select Color
                  </p>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductColorButtons variants={variants} />
                  </Suspense>
                </div>
                <div className="flex flex-col gap-1 w-full pt-5">
                  <p className="font-plex-sans font-medium text-[18px] lg:text-[20px]">
                    Select Size
                  </p>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductSizeButtons variants={variants} />
                  </Suspense>
                </div>
                <div className="flex flex-col w-full pt-5 gap-3">
                  <p className="font-plex-sans font-medium text-[18px] lg:text-[20px]">
                    Quantity
                  </p>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductQuantity variants={variants} />
                  </Suspense>
                </div>

                <div className="flex flex-col w-full gap-4 pt-10">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductBuyButtons
                      userId={userId}
                      productId={productId}
                      temp_cartId={temp_cartId}
                    />
                  </Suspense>
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
                    flaggedReviews={flaggedReviews}
                  />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full min-h-0 pb-5 pt-10">
            <p className="font-plex-sans font-medium text-[30px] pl-5">
              Recently Viewed Products
            </p>
            <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hidden whitespace-nowrap h-auto">
              <div className="flex flex-nowrap pt-5 w-max gap-5 min-h-[375px] px-5 pb-5">
                <Suspense fallback={<div>Loading products... </div>}>
                  {recentlyViewedProds?.length > 0 ? (
                    recentlyViewedProds
                      .slice(0, 10)
                      .map((product: ProductType) => {
                        return (
                          <ProductCard
                            key={product._id}
                            product={product}
                            isHearted={heartedProducts.includes(product._id)}
                            callbackUrl={callbackUrl}
                            user={user}
                          />
                        );
                      })
                  ) : !userId ? (
                    <div>Must sign in to view recently viewed products</div>
                  ) : (
                    <div>No recently viewed products</div>
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden max-w-screen pt-[4rem] md:pt-[0] pb-10 scrollbar-hidden">
          <div className="product-page-wrapper scrollbar-hidden">
            <div className="flex flex-col p-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 xs:gap-5 font-plex-sans font-bold text-[16px] xs:text-[18px] items-center">
                  <img
                    src={urlFor(brands[0]?.logo).url()}
                    alt="brand logo"
                    width={80}
                    height={50}
                    className="object-contain w-8 h-8 xs:w-10 xs:h-10"
                  />
                  <p>{capitalizeBrand(brands[0])}</p>
                </div>
                <div className="sm:pr-5">
                  <Suspense fallback={<div>Heart</div>}>
                    <ProductHeart
                      isHearted={heartedProducts?.includes(
                        productId.toString()
                      )}
                      productId={productId}
                      userId={userId}
                      callbackUrl={callbackUrl}
                    />
                  </Suspense>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="font-plex-sans font-bold text-[22px] xs:text-[24px]">
                  {title}
                </p>
                {categories &&
                  categories.length > 0 &&
                  categories.map((obj: CategoryType, index: number) => (
                    <p
                      key={index}
                      className="font-plex-sans font-regular text-[14px] xs:text-[16px]"
                    >
                      {obj.name}
                    </p>
                  ))}
              </div>
              <p className="font-plex-sans font-regular text-[16px] xx:text-[18px]">
                ${cost}
              </p>
            </div>
            <Suspense fallback={<div>Loading Product Images...</div>}>
              <MobileProductImages
                imageMain={imageMain}
                galleryImages={galleryImages}
              />
            </Suspense>
            <div className="flex flex-col w-full p-5 mt-5">
              <p className="font-plex-sans font-medium text-[16px] xs:text-[18px]">
                Select Color
              </p>
              <Suspense fallback={<div>Loading Product Colors...</div>}>
                <ProductColorButtons variants={variants} />
              </Suspense>
            </div>
            <div className="flex flex-col w-full p-5">
              <p className="font-plex-sans font-medium text-[16px] xs:text-[18px]">
                Select Size
              </p>
              <Suspense fallback={<div>Loading Product Sizes...</div>}>
                <ProductSizeButtons variants={variants} />
              </Suspense>
            </div>
            <div className="flex flex-col w-full p-5 gap-3">
              <p className="font-plex-sans font-medium text-[16px] xs:text-[18px]">
                Quantity
              </p>
              <Suspense fallback={<div>Loading Product Quantity...</div>}>
                <ProductQuantity variants={variants} />
              </Suspense>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductBuyButtons
                userId={userId}
                productId={productId}
                temp_cartId={temp_cartId}
              />
            </Suspense>

            <div className="flex items-center justify-center text-wrap mt-10 px-5">
              {parsedDescription ? (
                <article
                  className="font-plex-sans font-regular text-[18px] xs:text-[20px]"
                  dangerouslySetInnerHTML={{ __html: parsedDescription }}
                />
              ) : (
                <p className="font-plex-sans font-regular text-[18px] xs:text-[20px]">
                  No description available
                </p>
              )}
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
                flaggedReviews={flaggedReviews}
              />
            </Suspense>
            <div className="flex flex-col gap-1 w-full text-start mt-16 min-h-0">
              <p className="font-plex-sans font-medium text-[24px] sm:text-[26px] pl-5">
                Recently Viewed Products
              </p>

              <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hidden whitespace-nowrap ">
                <div className="w-max flex flex-nowrap px-5 h-atuo gap-3 pt-2 pb-5 min-h-[200px]">
                  <Suspense fallback={<div>Loading products... </div>}>
                    {recentlyViewedProds?.length > 0 ? (
                      recentlyViewedProds
                        .slice(0, 10)
                        .map((product: ProductType) => {
                          return (
                            <div
                              key={product._id}
                              className="flex w-full h-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] max-w-[250px] sm:max-w-[300px] md:max-w-[350px]"
                            >
                              <ProductCard
                                product={product}
                                isHearted={heartedProducts.includes(
                                  product._id
                                )}
                                callbackUrl={callbackUrl}
                                user={user}
                              />
                            </div>
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
        </div>
      </ProductOptionsProvider>
    </Suspense>
  );
};

export default page;
