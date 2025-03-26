import { ReviewStatsType } from "@/globalTypes";
import React from "react";
import Slider from "@/components/Slider";

interface Props {
  reviewStats: ReviewStatsType;
}

const ReviewSummarySliders = ({ reviewStats }: Props) => {
  const {
    normalizedSize,
    normalizedComfort,
    averageWouldRecommend,
    normalizedWidth,
    normalizedQuality,
    normalizedValue,
  } = reviewStats;

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
        subTitleThree="Yes!"
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
