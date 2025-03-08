"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getNumberOfReviews } from "@/lib/utils";
import ReviewStars from "./ReviewStars";
import ReviewCard from "./ReviewCard";
import { ReviewType } from "@/globalTypes";
import ViewReviews from "@/components/ViewReviews";
import Link from "next/link";
import { SanityImage } from "@/globalTypes";

const ProductDetailsDrop = ({
  mainDetails,
  detailBullets,
  reviews,
  selectedReviews,
  userReview,
  productId,
  mainImage,
  title,
  cost,
}: {
  mainDetails: string;
  detailBullets: string[];
  reviews: ReviewType[];
  selectedReviews: ReviewType[];
  userReview: ReviewType;
  productId: string;
  mainImage: SanityImage;
  title: string;
  cost: string;
}) => {
  console.log("Title", title);
  console.log("cost", cost);
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
    console.log("Setting the opositive of setViewRevies");
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
      <div className="product-drop-section">
        <div
          className="product-drop-block"
          onClick={() => handleDropClick("details")}
        >
          <p>Details</p>
          {droppedInfo.details ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>

        {droppedInfo.details && (
          <div className="flex flex-col w-full font-plex-sans font-regular text-[18px] gap-4">
            <p>{mainDetails}</p>
            <ul className="list-disc list-inside">
              {detailBullets.map((bullet: string, index: number) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="product-drop-section">
        <div
          className="product-drop-block"
          onClick={() => handleDropClick("productReviews")}
        >
          <p>Reviews ({reviews.length})</p>
          {droppedInfo.productReviews ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
        {droppedInfo.productReviews && (
          <div className="flex flex-col gap-5">
            <div className="font-plex-sans font-light text-[19px]">
              <span>{getNumberOfReviews(reviews.length)}</span>
            </div>
            <div>
              <ReviewStars reviews={reviews} />
            </div>

            <p className="flex font-plex-sans text-[18px] font-medium ">
              {userReview != null ? (
                <span
                  className="underline underline-offset-4 hover:text-secondary-200 ease-in-out duration-200 cursor-pointer"
                  onClick={() => handleToggleEdit(editReview)}
                >
                  {editReview ? "Stop Editing" : "Edit Review"}
                </span>
              ) : (
                <span className="underline underline-offset-4 hover:text-secondary-200 ease-in-out duration-200 cursor-pointer">
                  <Link href={`/writeReview/${productId}`}>
                    Write a Review!
                  </Link>
                </span>
              )}
            </p>
            <div className="flex flex-col pt-2 gap-8">
              {selectedReviews ? (
                selectedReviews.map((review: ReviewType, index: number) => (
                  <ReviewCard
                    productId={productId}
                    productReview={review}
                    key={index}
                    userReview={userReview}
                    editReview={editReview}
                    setEditReview={setEditReview}
                  />
                ))
              ) : (
                <div className="font-plex-sans font-regular text-[20px]">
                  No reviews yet...
                </div>
              )}
            </div>

            <div className="flex font-plex-sans text-[18px] font-medium ">
              {viewReviews ? (
                <div className="flex fixed top-0 left-0 w-full h-full justify-center items-center bg-white-300 overflow-y-hidden z-50">
                  <ViewReviews
                    reviews={reviews}
                    userReview={userReview}
                    viewReviews={viewReviews}
                    setViewReviews={setViewReviews}
                    mainImage={mainImage}
                    title={title}
                    cost={cost}
                  />
                </div>
              ) : (
                <button
                  className="h-auto"
                  onClick={handleToggleViewMoreReviews}
                >
                  <span className="underline underline-offset-4 hover:text-secondary-200 ease-in-out duration-200 cursor-pointer">
                    More Reviews
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsDrop;
