import React from "react";
import { Fullscreen, Star } from "lucide-react";
import { getReviewRating } from "@/lib/utils";
import { ReviewType } from "@/globalTypes";

const ReviewStars = ({
  reviews,
  size = 24,
}: {
  reviews: ReviewType[] | ReviewType;
  size?: number;
}) => {
  const normalizedReviews = Array.isArray(reviews) ? reviews : [reviews];
  const averageRating = getReviewRating(normalizedReviews);
  const fullStars = Math.floor(averageRating);
  const partialStar = averageRating % 1;
  const emptyStars = Math.floor(5 - fullStars - partialStar);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-3 items-center">
        {averageRating % 1 == 0 ? (
          <p
            className={`font-plex-sans ${size != 24 ? "text-[26px]" : "text-[22px]"}`}
          >
            {averageRating}
          </p>
        ) : (
          <p
            className={`font-plex-sans ${size != 24 ? "text-[26px]" : "text-[22px]"}`}
          >
            {averageRating.toFixed(1)}
          </p>
        )}

        <div className="flex">
          {Array.from({ length: fullStars }).map((_, index) => (
            <Star
              key={index}
              size={size}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}

          {partialStar > 0 && (
            <div className="relative">
              <Star size={size} className="text-yellow-400" />
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${partialStar * 100}%` }}
              >
                <Star
                  size={size}
                  className="fill-yellow-400 text-yellow-400"
                />{" "}
              </div>
            </div>
          )}

          {Array.from({ length: emptyStars }).map((_, index) => (
            <Star key={index} size={size} className="text-gray-300" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStars;
