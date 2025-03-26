"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getNumberOfReviews } from "@/lib/utils";
import ReviewStars from "./ReviewStars";
import ReviewCard from "./ReviewCard";
import { FlaggedReviewType, ReviewStatsType, ReviewType } from "@/globalTypes";
import ViewReviews from "@/components/ViewReviews";
import Link from "next/link";
import { SanityImage } from "@/globalTypes";

const ProductDetailsDrop = ({
  mainDetails,
  detailBullets,
  reviews,
  selectedReviews,
  userReview,
  userId,
  productId,
  mainImage,
  title,
  cost,
  reviewStats,
  flaggedReviews,
}: {
  mainDetails: string;
  detailBullets: string[];
  reviews: ReviewType[];
  selectedReviews: ReviewType[];
  userReview: ReviewType;
  userId: string | null;
  productId: string;
  mainImage: SanityImage;
  title: string;
  cost: string;
  reviewStats: ReviewStatsType;
  flaggedReviews: FlaggedReviewType[];
}) => {
  const [droppedInfo, setDroppedInfo] = useState<Record<string, boolean>>({
    details: false,
    productReviews: false,
  });

  const [editReview, setEditReview] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);

  const handleToggleEdit = (current: boolean) => {
    setEditReview(!current);
  };

  const handleToggleViewMoreReviews = () => {
    setViewReviews(!viewReviews);
  };

  const handleDropClick = (section: string) => {
    setDroppedInfo((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="product-drop">
      <div
        className={`flex flex-col border-b-[2px] pb-4 border-borderColor-100 ${droppedInfo.details ? "gap-4" : ""}`}
      >
        <div
          className="product-drop-block"
          onClick={() => handleDropClick("details")}
        >
          <p className="font-plex-sans text-[22px] sm:text-[24px] md:text-[26px]">
            Details
          </p>
          {droppedInfo.details ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>

        <div
          className={`w-full transform transition-all duration-300 ease-in-out scrollbar-hidden ${droppedInfo.details ? "flex-col max-h-full gap-4" : "max-h-0 overflow-hidden"}`}
        >
          <div
            className={`flex flex-col w-full font-plex-sans font-regular text-[16px] sm:text-[18px] gap-4 transform transition-all duration-200 ease-in-out ${droppedInfo.details ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
          >
            <p>{mainDetails}</p>
            <ul className={`list-disc list-inside`}>
              {detailBullets.map((bullet: string, index: number) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col border-b-[2px] pb-4 border-borderColor-100 ${droppedInfo.productReviews ? "gap-4" : ""}`}
      >
        <div
          className="product-drop-block"
          onClick={() => handleDropClick("productReviews")}
        >
          <p className="font-plex-sans text-[22px] sm:text-[24px] md:text-[26px]">
            Reviews ({reviews.length})
          </p>
          {droppedInfo.productReviews ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
        <div
          className={`flex transform w-full transition-all duration-300 ease-in-out scrollbar-hidden ${droppedInfo.productReviews ? "max-h-full" : "max-h-0 overflow-hidden"}`}
        >
          <div
            className={`flex flex-col w-full gap-5 transform transition-all duration-200 ease-in-out scrollbar-hidden ${droppedInfo.productReviews ? "translate-y-0 opacity-100 " : "-translate-y-full opacity-0"}`}
          >
            <div className="font-plex-sans font-light text-[14px] sm:text-[16px] md:text-[19px]">
              <span>{getNumberOfReviews(reviews.length)}</span>
            </div>
            <div>
              <ReviewStars reviews={reviews} />
            </div>

            <p className="flex font-plex-sans text-[18px] font-medium">
              {userReview != null ? (
                <span
                  className="underline underline-offset-4 hover:text-secondary-200 ease-in-out duration-200 cursor-pointer font-plex-sans text-[16px] sm:text-[18px] lg:text-[20px]"
                  onClick={() => handleToggleEdit(editReview)}
                >
                  {editReview ? "Stop Editing" : "Edit Review"}
                </span>
              ) : (
                <span className="underline underline-offset-4 hover:text-secondary-200 ease-in-out duration-200 cursor-pointer font-plex-sans text-[16px] sm:text-[18px] lg:text-[20px]">
                  <Link href={`/writeReview/${productId}`}>
                    Write a Review!
                  </Link>
                </span>
              )}
            </p>
            <div className={`flex flex-col pt-2 gap-8`}>
              {selectedReviews ? (
                selectedReviews.map((review: ReviewType, index: number) => (
                  <ReviewCard
                    userId={userId}
                    productId={productId}
                    productReview={review}
                    key={index}
                    userReview={userReview}
                    editReview={editReview}
                    setEditReview={setEditReview}
                    flaggedReviews={flaggedReviews}
                  />
                ))
              ) : (
                <div className="font-plex-sans font-regular text-[20px]">
                  No reviews yet...
                </div>
              )}
            </div>

            <div className="flex font-plex-sans text-[18px] font-medium ">
              {!viewReviews && (
                <button
                  className="h-auto"
                  onClick={handleToggleViewMoreReviews}
                >
                  <span className="underline underline-offset-4 hover:text-secondary-200 ease-in-out duration-200 cursor-pointer font-plex-sans text-[16px] sm:text-[18px] lg:text-[20px]">
                    More Reviews
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <ViewReviews
          userId={userId}
          productId={productId}
          reviews={reviews}
          userReview={userReview}
          viewReviews={viewReviews}
          setViewReviews={setViewReviews}
          editReview={editReview}
          setEditReview={setEditReview}
          mainImage={mainImage}
          title={title}
          cost={cost}
          reviewStats={reviewStats}
          flaggedReviews={flaggedReviews}
        />
      </div>
    </div>
  );
};

export default ProductDetailsDrop;
