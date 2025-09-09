"use client";
import { FlaggedReviewType, ReviewStatsType, ReviewType } from "@/globalTypes";
import React from "react";
import { useEffect, useRef } from "react";
import { SanityImage } from "@/globalTypes";
import { urlFor } from "@/sanity/lib/client";
import ReviewStars from "./ReviewStars";
import { getNumberOfReviews, getNumReviewsPerStar } from "@/lib/utils";
import { Star } from "lucide-react";
import ReviewSummarySliders from "./ReviewSummarySliders";
import { useState } from "react";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Square,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReviewCard from "./ReviewCard";

interface Props {
  userId: string | null;
  productId: string;
  reviews: ReviewType[];
  userReview: ReviewType;
  viewReviews: boolean;
  setViewReviews: React.Dispatch<React.SetStateAction<boolean>>;
  editReview: boolean;
  setEditReview: React.Dispatch<React.SetStateAction<boolean>>;
  mainImage: SanityImage;
  title: string;
  cost: string;
  reviewStats: ReviewStatsType;
  flaggedReviews: FlaggedReviewType[];
}

const ViewReviews = ({
  userId,
  productId,
  reviews,
  userReview,
  viewReviews,
  setViewReviews,
  editReview,
  setEditReview,
  mainImage,
  title,
  cost,
  reviewStats,
  flaggedReviews,
}: Props) => {
  const [reviewContent, setReviewContent] = useState(reviews);
  const [sortDropDown, setSortDropDown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most Recent");
  const sortDropDownTitle = [
    { title: "Most Recent", value: 0 },
    { title: "Oldest", value: 1 },
    { title: "Highest Rated", value: 2 },
    { title: "Lowest Rated", value: 3 },
  ];
  const [searchFilterInput, setSearchFilterInput] = useState("");
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [filterRating, setFilterRating] = useState<number[]>([]);
  const [filterVisual, setFilterVisual] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const sortDropRef = useRef<HTMLDivElement | null>(null);
  const sortDropDropDownRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const filterDropDownRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const numReviewsPerStar = getNumReviewsPerStar(reviews);
  const reviewsPerPage = 10;
  const totalPages = Math.ceil(reviewContent.length / reviewsPerPage);

  const paginatedReviews = reviewContent.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  useEffect(() => {
    if (viewReviews) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    const handleClickOutsideSort = (event: MouseEvent | TouchEvent) => {
      const sortClickedOuter = sortDropRef.current?.contains(
        event.target as Node
      );
      const sortClickedInner = sortDropDropDownRef.current?.contains(
        event.target as Node
      );

      const filterClickedOuter = filterRef.current?.contains(
        event.target as Node
      );
      const filterClickedInner = filterDropDownRef.current?.contains(
        event.target as Node
      );

      if (!sortClickedInner && !sortClickedOuter) {
        setSortDropDown(false);
      } else if (!sortClickedInner && sortClickedOuter) {
        setSortDropDown((prev) => !prev);
      }

      if (!filterClickedInner && !filterClickedOuter) {
        setFilterDropDown(false);
      } else if (!filterClickedInner && filterClickedOuter) {
        setFilterDropDown((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideSort);
    document.addEventListener("touchstart", handleClickOutsideSort);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSort);
      document.removeEventListener("touchstart", handleClickOutsideSort);
    };
  }, []);

  const getRelevantDate = (review: ReviewType) => {
    return review._createdAt !== review._updatedAt
      ? new Date(review?._updatedAt as string)
      : new Date(review?._createdAt as string);
  };

  const updateReviews = (
    sort: string | null,
    stars: number[],
    query?: string
  ): ReviewType[] => {
    let newReviews: ReviewType[] = [...reviews];

    if (query) {
      newReviews = newReviews.filter(
        (review) =>
          review.reviewTitle
            ?.toLowerCase()
            ?.includes(query?.toLowerCase() as string) ||
          review.review?.toLowerCase()?.includes(query?.toLowerCase() as string)
      );
    }

    if (stars?.length > 0) {
      newReviews = newReviews.filter((review) =>
        stars.includes(review.mainRating as number)
      );
    }

    switch (sort) {
      case "Most Recent":
        newReviews.sort(
          (a, b) => getRelevantDate(b).getTime() - getRelevantDate(a).getTime()
        );
        break;
      case "Oldest":
        newReviews.sort(
          (a, b) => getRelevantDate(a).getTime() - getRelevantDate(b).getTime()
        );
        break;
      case "Highest Rated":
        newReviews.sort(
          (a, b) => (b.mainRating as number) - (a.mainRating as number)
        );
        break;
      case "Lowest Rated":
        newReviews.sort(
          (a, b) => (a.mainRating as number) - (b.mainRating as number)
        );
        break;
    }

    return newReviews;
  };

  useEffect(() => {
    setReviewContent(
      updateReviews(selectedSort, filterRating, searchFilterInput)
    );
  }, [selectedSort, filterRating, searchFilterInput]);

  const handleSortToggle = (title: string) => {
    setSelectedSort(title);
  };

  const handleStarVisualClick = (text: string) => {
    const filterVisualText = [
      "5 STARS",
      "4 STARS",
      "3 STARS",
      "2 STARS",
      "1 STAR",
    ];
    const ratingIndex = filterVisualText.indexOf(text);
    const correctedStarIndex = 5 - ratingIndex;
    setFilterRating((prev) => {
      const newSelection = prev.includes(correctedStarIndex)
        ? prev.filter((s) => s !== correctedStarIndex)
        : [...prev, correctedStarIndex];
      return newSelection;
    });
    setFilterVisual((prev) => {
      const newSelection = prev.includes(text)
        ? prev.filter((s) => s !== text)
        : [...prev, text];
      return newSelection;
    });
  };

  const handleClearAllStarVisuals = () => {
    setFilterVisual([]);
    setFilterRating([]);
  };

  const handleStarSelect = (star: number) => {
    const correctedStarIndex = 5 - star;
    const filterVisualText = [
      "5 STARS",
      "4 STARS",
      "3 STARS",
      "2 STARS",
      "1 STAR",
    ];
    setFilterRating((prev) => {
      const newSelection = prev.includes(correctedStarIndex)
        ? prev.filter((s) => s !== correctedStarIndex)
        : [...prev, correctedStarIndex];
      return newSelection;
    });

    setFilterVisual((prev) => {
      const newSelection = prev.includes(filterVisualText[star])
        ? prev.filter((s) => s !== filterVisualText[star])
        : [...prev, filterVisualText[star]];
      return newSelection;
    });
  };

  const handlePageScroll = () => {
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  };

  return (
    <>
      <div
        className={`fixed inset-0 justify-center items-center bg-white-300 overflow-y-hidden z-[999] transform transition-all duration-300 ease-in-out pb-[env(safe-area-inset-bottom) + 1.25rem] pt-[env(safe-area-inset-top) + 1.25rem] md:pt-0 md:pb-0 ${viewReviews ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div className="flex flex-col gap-5 h-full w-full p-5 overflow-y-auto scrollbar-hidden">
          <div className="flex flex-row justify-between" ref={scrollRef}>
            <div className="flex items-center gap-3">
              <img
                src={urlFor(mainImage).url()}
                alt="product image"
                width={150}
                height={200}
                className="object-contain w-20 h-20"
              />

              <div className="flex flex-col gap-0">
                <p className="font-plex-sans font-regular text-[16px] ">
                  {title}
                </p>
                <p className="font-plex-sans font-light text-[12px]">${cost}</p>
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-end items-center p-1 rounded-full hover:bg-gray-300 transition duration-200 ease-in-out">
                <X
                  size="30px"
                  className="cursor-pointer text-gray-600"
                  strokeWidth={1}
                  onClick={() => setViewReviews(false)}
                />
              </div>
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
              <ReviewSummarySliders reviewStats={reviewStats} />
            </div>
            <div className="relative flex flex-col w-full gap-3 pt-5">
              <p className="font-plex-sants text-medium text-[16px]">
                Showing{" "}
                {totalPages === 0 ? 0 : (currentPage - 1) * reviewsPerPage + 1}-
                {Math.min(currentPage * reviewsPerPage, reviewContent.length)}{" "}
                of {reviewContent.length} reviews
              </p>
              <div className="flex flex-row gap-1 w-full items-center font-plex-sans font-regular text-[14px] sm:text-[16px] overflow-x-auto whitespace-nowrap scrollbar-hidden">
                <div ref={sortDropRef}>
                  <button className="w-auto sm:w-[125px] h-auto">
                    <p className="font-plex-sans font-regular text-[11px] sm:text-[12px] text-left">
                      Sort
                    </p>
                    <div className="flex flex-row gap-1 items-center">
                      <p className="text-left">{selectedSort}</p>
                      {sortDropDown ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  <div className="absolute left-0 mt-1 w-auto w-[125px] sm:w-[150px] bg-gray-100 shadow-md rounded-md z-50">
                    {sortDropDown && (
                      <div className="flex flex-col" ref={sortDropDropDownRef}>
                        {sortDropDownTitle.map(({ title }, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleSortToggle(title);
                            }}
                            className="font-plex-sans items-center font-light text-[12px] sm:text-[14px] w-full text-left hover:bg-white-400 p-3 transition:hover duration-200 ease-in-out"
                          >
                            <div className="flex flex-row gap-2">
                              {selectedSort === title && (
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              )}
                              {title}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative ml-2 sm:ml-0 flex rounded-md items-center w-[150px] min-w-[150px] h-auto">
                  <Search width={18} height={18} className="mt-2" />
                  <input
                    className="pl-2 pr-2 pt-2 focus:outline-none bg-white-300 focus:ring-0 rounded-md w-full pr-8"
                    placeholder="Search filters..."
                    value={searchFilterInput}
                    onChange={(e) => {
                      setSearchFilterInput(e.target.value);
                    }}
                  />
                  {searchFilterInput && (
                    <X
                      width={14}
                      height={14}
                      className="absolute right-3 mt-2 cursor-pointer hover:opacity-30 transition:opacity duration-200 ease-in-out"
                      onClick={() => setSearchFilterInput("")}
                    />
                  )}
                </div>

                <div ref={filterRef}>
                  <button className="sm:w-[100px] h-auto">
                    <p className="font-plex-sans font-regular text-[11px] sm:text-[12px] text-left">
                      Filter
                    </p>
                    <div className="flex flex-row gap-1 items-center">
                      <p className="text-left">Star Ratings</p>
                      {filterDropDown ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  <div className="absolute mt-1 w-auto min-w-[150px] left-2/3 transform -translate-x-1/2  sm:transform-none sm:left-auto max-w-[calc(100vw-16px)] whitespace-nowrap overflow-hidden bg-gray-100 shadow-md rounded-md z-20">
                    {filterDropDown && (
                      <div className="flex flex-col" ref={filterDropDownRef}>
                        {Object.entries(numReviewsPerStar).map(
                          ([_key, value], index) => (
                            <div
                              key={index}
                              className="flex items-center gap-0 sm:gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleStarSelect(index)}
                            >
                              <div className="realative flex items-center justify-center">
                                <Square className="className=w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                {filterRating.includes(5 - index) && (
                                  <Check className="absolute w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                )}
                              </div>

                              {Array.from({ length: 5 }).map((_key, i) => (
                                <Star
                                  key={i}
                                  className={`className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                                    i < 5 - index
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}

                              {/* Display Count of Reviews per Star */}
                              <span className="font-plex-sans font-light text-[14px] sm:text-[16px] text-gray-600">
                                {`(${value as number})`}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-5 overflow-x-auto whitespace-nowrap scrollbar-hidden">
                {filterVisual?.length > 0 && (
                  <div
                    className="flex items-center justify-center cursor-pointer px-3 py-1 bg-gray-200 rounded-md transition hover:bg-gray-300 duration-200 ease-in-out"
                    onClick={() => handleClearAllStarVisuals()}
                  >
                    <p className="font-plex-sants font-regular text-[14px] sm:text-[16px]">
                      Clear all
                    </p>
                  </div>
                )}
                {Object.entries(filterVisual).map(([_key, text], index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-3 font-plex-sans font-regular text-[13px] px-2 py-1 rounded-full transition hover:bg-gray-300 duration-200 ease-in-out cursor-pointer"
                    onClick={() => handleStarVisualClick(text)}
                  >
                    <p>{text}</p>
                    <div className="flex items-center justify-center bg-gray-200 p-0.5 rounded-full">
                      <X height={12} width={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid cols-1 sm:cols-2 md:cols-3 lg:cols-4 gap-8 pt-5">
              {paginatedReviews.slice(0, 10).map((review, index) => (
                <div
                  key={index}
                  className="flex h-auto w-full gap-1 border-b-[2px] pb-8 border-borderColor-100"
                >
                  <ReviewCard
                    userId={userId}
                    productId={productId}
                    productReview={review}
                    userReview={userReview}
                    editReview={editReview}
                    setEditReview={setEditReview}
                    flaggedReviews={flaggedReviews}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <button
                className={`px-3 py-1 rounded-full ${currentPage === 1 ? "text-gray-400 pointer-events-none" : "text-black transition hover:opacity-60 duration-200 ease-in-out"}`}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  handlePageScroll();
                }}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-[18px] sm:size-[20px]" />
              </button>

              {Array.from({ length: totalPages }, (_key, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-full text-[18px] sm:text-[20px] ${currentPage === i + 1 ? "bg-gray-500 text-white" : "transition hover:bg-gray-300 duration-200 ease-in-out"}`}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    handlePageScroll();
                  }}
                >
                  {i}
                </button>
              ))}

              <button
                className={`px-3 py-1 rounded-full ${currentPage === totalPages || totalPages == 0 ? "text-gray-400 pointer-events-none" : "text-black transition hover:opacity-60 duration-200 ease-in-out"}`}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  handlePageScroll();
                }}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-[18px] sm:size-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewReviews;
