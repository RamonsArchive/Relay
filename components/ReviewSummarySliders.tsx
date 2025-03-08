import { ReviewType } from "@/globalTypes";
import React from "react";
import Slider from "@/components/Slider";

interface Props {
  reviews: ReviewType[];
}

const ReviewSummarySliders = ({ reviews }: Props) => {
  const totalReviews = reviews.length || 1;
  const averageSize =
    reviews.reduce((sum, r) => sum + (r.sizeRating || 2), 0) / totalReviews;
  console.log("true average size", averageSize);
  const averageComfort =
    reviews.reduce((sum, r) => sum + (r.comfortRating || 2), 0) / totalReviews;
  const averageWouldRecommend =
    reviews.reduce((sum, r) => sum + (r.wouldRecommend === true ? 1 : 0), 0) /
    totalReviews;
  const averageWidth =
    reviews.reduce((sum, r) => sum + (r.widthRating || 2), 0) / totalReviews;
  const averageQuality =
    reviews.reduce((sum, r) => sum + (r.qualityRating || 2), 0) / totalReviews;
  const averageValue =
    reviews.reduce((sum, r) => sum + (r.valueRating || 2), 0) / totalReviews;

  const normalizeRating = (rating: number) => (rating - 1) / 2;

  const normalizedSize = normalizeRating(averageSize);
  const normalizedComfort = normalizeRating(averageComfort);
  const normalizedWidth = normalizeRating(averageWidth);
  const normalizedQuality = normalizeRating(averageQuality);
  const normalizedValue = normalizeRating(averageValue);

  console.log("Average size", averageSize);
  console.log("normalized size", normalizedSize);
  console.log("Average Comfort", averageComfort);
  console.log("normalized comfort", normalizedComfort);
  console.log("average would reccomend", averageWouldRecommend);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 rounded-lg w-full max-w-screen-xl">
      <Slider
        label="How does this product fit?"
        subTitleOne="Runs Small"
        subTitleTwo="True to Size"
        subTitleThree="Runs Big"
        value={normalizedSize}
      />
      <Slider
        label="How comfortable was this product?"
        subTitleOne="Uncomfortable"
        subTitleTwo="Average"
        subTitleThree="Very Comfortable"
        value={normalizedComfort}
      />

      <Slider
        label="Would others recommend?"
        subTitleOne="Wouldn't"
        subTitleTwo="Probably"
        subTitleThree="Very Likely"
        value={averageWouldRecommend}
        type="boolean"
      />

      <Slider
        label="How is the width of this product?"
        subTitleOne="Runs skinny"
        subTitleTwo="True to Width"
        subTitleThree="Runs Wide"
        value={normalizedWidth}
      />
      <Slider
        label="How is the quality?"
        subTitleOne="Poor"
        subTitleTwo="Average"
        subTitleThree="Great"
        value={normalizedQuality}
      />
      <Slider
        label="How is the value?"
        subTitleOne="Poor"
        subTitleTwo="Average"
        subTitleThree="Great"
        value={normalizedValue}
      />
    </div>
  );
};

export default ReviewSummarySliders;
