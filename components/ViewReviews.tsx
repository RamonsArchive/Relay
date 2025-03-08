"use client";
import { ReviewStatsType, ReviewType } from "@/globalTypes";
import React, { useActionState } from "react";
import { useEffect } from "react";
import { SanityImage } from "@/globalTypes";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import ReviewStars from "./ReviewStars";
import { getNumberOfReviews, parseServerActionResponse } from "@/lib/utils";
import { CircleX } from "lucide-react";
import ReviewSummarySliders from "./ReviewSummarySliders";
import { useState } from "react";
import { Check, X } from "lucide-react";
import Form from "next/form";

interface Props {
  reviews: ReviewType[];
  userReview: ReviewType;
  viewReviews: boolean;
  setViewReviews: React.Dispatch<React.SetStateAction<boolean>>;
  mainImage: SanityImage;
  title: string;
  cost: string;
  reviewStats: ReviewStatsType;
}

const ViewReviews = ({
  reviews,
  userReview,
  viewReviews,
  setViewReviews,
  mainImage,
  title,
  cost,
  reviewStats,
}: Props) => {
  const [sortDropDown, setSortDropDown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most Recent");
  const [sortDropDownTitle, setSortDropDownTitle] = useState<
    { title: string; value: number }[]
  >([
    { title: "Most Recent", value: 0 },
    { title: "Oldest", value: 1 },
    { title: "Highest Rated", value: 2 },
    { title: "Lowest Rated", value: 3 },
  ]);
  const [searchFilterInput, setSearchFilterInput] = useState("");
  const [filterRating, setFilterRating] = useState(-1);

  console.log("Review stats view reviews", reviewStats);

  const handleSortDropDownToggle = (title: string, value: number) => {
    console.log("Title", title);
    console.log("value", value);
    setSelectedSort(title);
    try {
      // fetch new review data using funciton in queires
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("View Reviews", viewReviews);
    if (viewReviews) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  const userId = "";

  const handleFormSubmit = (prevState: any, formData: FormData) => {
    try {
    } catch (error) {
      console.error(error);
      return parseServerActionResponse({
        status: "ERROR",
        error: "Interanl server error",
      });
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    status: "INITAIL",
    error: "",
  });

  return (
    <div className="flex flex-col gap-5 h-[100vh] overflow-y-auto w-full p-3">
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
          <ReviewSummarySliders reviews={reviews} reviewStats={reviewStats} />
        </div>
        <div className="flex flex-col w-full gap-3">
          <p className="font-plex-sants text-medium text-[16px]">
            1-10 reviews
          </p>
          <div className="flex flex-row w-full font-plex-sans font-regular text-[16px]">
            <div className="relative">
              <button
                className="sm:w-[100px] md:w-[125px] lg:w-[150px] h-auto"
                onClick={() => setSortDropDown(!sortDropDown)}
              >
                <div className="flex flex-col">
                  <p className="font-plex-sans font-regular text-[12px] text-left">
                    Sort
                  </p>
                </div>
                <p className="text-left">{selectedSort}</p>
              </button>
              <div className="absolute top-full mt-1 w-auto min-w-[150px] max-w-[200px] bg-gray-100 shadow-md rounded-md">
                {sortDropDown && (
                  <div className="flex flex-col">
                    {sortDropDownTitle.map(({ title, value }, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleSortDropDownToggle(title, value);
                        }}
                        className="font-plex-sans items-center font-light text-[14px] w-full text-left hover:bg-white-400 p-3 transition:hover duration-200 ease-in-out"
                      >
                        <div className="flex flex-row gap-2">
                          {selectedSort === title && (
                            <Check width={15} height={15} />
                          )}
                          {title}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Form
              action={formAction}
              className="relative flex items-center rounded-md sm:w-[100px] md:w-[150px] lg:w-[200px] h-auto"
            >
              <input
                className="p-2 focus:outline-none focus:ring-0 rounded-md w-full pr-8"
                placeholder="Search filters..."
                value={searchFilterInput}
                onChange={(e) => {
                  setSearchFilterInput(e.target.value);
                  formAction;
                }}
              />
              {searchFilterInput && (
                <X
                  width={14}
                  height={14}
                  className="absolute right-3 cursor-pointer hover:opacity-30 transition:opacity duration-200 ease-in-out"
                  onClick={() => setSearchFilterInput("")}
                />
              )}
            </Form>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ViewReviews;
