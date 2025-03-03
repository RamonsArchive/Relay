import React from "react";
import { formatDate } from "@/lib/utils";
import ReviewStars from "./ReviewStars";
import { urlFor } from "@/sanity/lib/client";
import { ReviewType } from "@/globalTypes";

const ReviewCard = ({ productReview }: { productReview: ReviewType }) => {
  const { reviewTitle, review, photo, nickname, _createdAt } = productReview;
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col ">
        {reviewTitle && (
          <h2 className="font-plex-sans font-medium text-[20px]">
            {reviewTitle.slice(0, 50)}
          </h2>
        )}
        <div className="flex flex-row font-plex-sans items-center text-[18px]">
          <ReviewStars reviews={productReview} />
          <p className="font-plex-sans font-light text-[14px]">
            {formatDate(_createdAt as string)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-plex-sans font-regular text-[18px]">{nickname}</p>
        <p className="font-plex-sans font-regular text-[20px]">{review}</p>
        {photo && (
          <img
            src={urlFor(photo).url()}
            alt="review photo"
            className="w-full w-[250px] h-auto max-h-[250px]"
          />
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
