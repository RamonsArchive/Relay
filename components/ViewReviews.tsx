"use client";
import { ReviewType } from "@/globalTypes";
import React from "react";
import { useEffect } from "react";
import { SanityImage } from "@/globalTypes";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import ReviewStars from "./ReviewStars";
import { getNumberOfReviews } from "@/lib/utils";
import { CircleX } from "lucide-react";
import ReviewSummarySliders from "./ReviewSummarySliders";
import { useState } from "react";

interface Props {
  reviews: ReviewType[];
  userReview: ReviewType;
  viewReviews: boolean;
  setViewReviews: React.Dispatch<React.SetStateAction<boolean>>;
  mainImage: SanityImage;
  title: string;
  cost: string;
}

const ViewReviews = ({
  reviews,
  userReview,
  viewReviews,
  setViewReviews,
  mainImage,
  title,
  cost,
}: Props) => {
  const [sortDropDown, setSortDropDown] = useState(false);
  const [sortDropDownTitle, setSortDropDownTitle] = useState<
    { title: string; value: number }[]
  >([
    { title: "Most Recent", value: 0 },
    { title: "Oldest", value: 1 },
    { title: "Highest Rated", value: 2 },
    { title: "Lowest Rated", value: 3 },
  ]);
  const [searchFilter, setSearchFilter] = useState("");
  const [filterRating, setFilterRating] = useState(-1);

  const handleSortDropDownToggle = (toggle: number) => {};
  console.log("Main Image", mainImage);
  useEffect(() => {
    console.log("View Reviews", viewReviews);
    if (viewReviews) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  console.log("Title", title);
  console.log("cost", cost);

  return (
    <div className="flex flex-col gap-5 h-[100vh] overflow-y-hidden w-full p-3">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={urlFor(mainImage).url()}
            alt="product image"
            width={150}
            height={200}
            className="object-contain w-20 h-20"
          />

          <div className="flex flex-col gap-0">
            <p className="font-plex-sans font-regular text-[16px] ">{title}</p>
            <p className="font-plex-sans font-light text-[12px]">${cost}</p>
          </div>
        </div>

        <div className="flex justify-self-end self-start">
          <CircleX
            size="34px"
            className="cursor-pointer"
            strokeWidth={1.3}
            onClick={() => setViewReviews(false)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center gap-3">
          <div>
            <ReviewStars reviews={reviews} size={40} />
          </div>
          <div className="font-plex-sans font-light text-[20px]">
            <span>{getNumberOfReviews(reviews.length)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ReviewSummarySliders reviews={reviews} />
        </div>
        <div className="flex flex-col w-full">
          <p className="font-plex-sants text-medium text-[16px]">
            1-10 reviews
          </p>
          <div className="flex flex-row w-full">
            <div className="flex">
              <button
                className="sm:w-[30px] md:w-[40px] lg:w-[50px]"
                onClick={() => setSortDropDown(!sortDropDown)}
              >
                {sortDropDownTitle && (
                  <div>
                    {sortDropDownTitle.map(({ title, value }, index) => (
                      <button
                        key={index}
                        onClick={() => handleSortDropDownToggle(value)}
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                )}
              </button>
              {sortDropDown && (
                <div>
                  <button></button>
                </div>
              )}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ViewReviews;
