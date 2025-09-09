"use client";
import React, { useActionState } from "react";
import { useState, useRef, useEffect } from "react";
import { formatDate, parseServerActionResponse } from "@/lib/utils";
import ReviewStars from "./ReviewStars";
import { urlFor } from "@/sanity/lib/client";
import { FlaggedReviewType, ReviewType, ActionState } from "@/globalTypes";
import { EllipsisVertical, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { editReviewSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import Form from "next/form";
import { Button } from "./ui/button";
import {
  deleteReview,
  deleteReviewFlag,
  writeFlaggedReview,
  writeReviewEdit,
} from "@/sanity/lib/actions";
import { Ban, Flag, Check } from "lucide-react";
import Cookies from "js-cookie";
import { revalidateFlaggedReviews } from "@/lib/serverActions";
import LoaderOverlay from "./LoaderOverlay";

const ReviewCard = ({
  userId,
  productId,
  productReview,
  userReview,
  editReview,
  setEditReview,
  flaggedReviews,
}: {
  userId: string | null;
  productId: string;
  productReview: ReviewType;
  userReview: ReviewType;
  editReview: boolean;
  setEditReview: React.Dispatch<React.SetStateAction<boolean>>;
  flaggedReviews: FlaggedReviewType[];
}) => {
  const { reviewTitle, review, photo, nickname, _createdAt, _updatedAt, _id } =
    productReview;

  const router = useRouter();
  const [dropEllipse, setDropEllipse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editReviewLoader, setEditReviewLoader] = useState(false);
  const [deleteReviewLoader, setDeleteReviewLoader] = useState(false);
  const [dropFlag, setDropFlag] = useState(false);

  const [flagged, setFlagged] = useState(false);
  const [flagPending, setFlagPending] = useState(false);
  const [flaggedReason, setFlaggedReason] = useState<string>("");
  const flaggedReasons = [
    "Inappropriate",
    "Misleading",
    "Hate Speech",
    "Harassment",
    "Violence",
    "Spam",
    "Other",
  ];

  const formRef = useRef<HTMLFormElement>(null);
  const ellipseDropRef = useRef<HTMLDivElement | null>(null);
  const ellipseRef = useRef<HTMLDivElement | null>(null);
  const flaggedRef = useRef<HTMLDivElement | null>(null);
  const flaggedDropDownRef = useRef<HTMLDivElement | null>(null);

  const [reviewText, setReviewText] = useState(review);

  const productUserId = productReview?.user?._id || "";
  const userReviewId = userReview?.user?._id || "";

  const reviewIsUserReview =
    productUserId == "" && userReviewId == ""
      ? false
      : productUserId == userReviewId
        ? true
        : false;

  const [isEditedReview, setIsEditedReview] = useState(
    _createdAt !== _updatedAt
  );

  useEffect(() => {
    const isFlagged = flaggedReviews.some((review) => {
      return review.review?._id === productReview._id;
    });
    setFlagged(isFlagged);
  }, [flaggedReviews, productReview]);

  useEffect(() => {
    if (_createdAt != _updatedAt) {
      setIsEditedReview(true);
    }
  }, [_updatedAt]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const ellipseClickedOuter = ellipseRef.current?.contains(
        event.target as Node
      );
      const ellipseClickedInner = ellipseDropRef.current?.contains(
        event.target as Node
      );

      const flagClickedOuter = flaggedRef.current?.contains(
        event.target as Node
      );
      const flagClickedInner = flaggedDropDownRef.current?.contains(
        event.target as Node
      );

      if (!ellipseClickedOuter && !ellipseClickedInner) {
        setDropEllipse(false);
      } else if (ellipseClickedOuter && !ellipseClickedInner) {
        setDropEllipse((prev) => !prev);
      }

      if (!flagClickedOuter && !flagClickedInner) {
        setDropFlag(false);
      } else if (flagClickedOuter && !flagClickedInner) {
        setDropFlag((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleEllipseEditSubmit = () => {
    if (editReview && formRef.current) {
      formRef.current.requestSubmit();
      // setEditReview(false);
    } else {
      setEditReview(true);
    }
    return;
  };

  const handleDeleteEdit = () => {
    setEditReview(false);
    setReviewText(review);
  };

  const handleDeleteReview = async () => {
    setDeleteReviewLoader(true);
    try {
      const result = await deleteReview(
        _id as string,
        productId,
        userReviewId as string
      );
      setDropEllipse(false);
      if (result.status === "SUCCESS") {
        toast.success("Success", {
          description: "Your review has been successfully deleated",
        });
        setEditReview(false);
        router.refresh();
        setDeleteReviewLoader(false);
      }

      if (result.status === "ERROR") {
        toast.error("Error", {
          description: "Error deleting Review.",
        });
        setDeleteReviewLoader(false);
      }
      return result;
    } catch (error) {
      setDropEllipse(false);
      setDeleteReviewLoader(false);
      console.error(error);
      toast.error("Error", {
        description: "Error deleting review",
      });
    }
  };

  const handleFromSubmit = async (
    prevState: ActionState,
    formData: FormData
  ) => {
    try {
      const editData = formData.get("review") || "";
      await editReviewSchema.parseAsync({ review: editData });

      const result = await writeReviewEdit(_id as string, editData as string);
      if (result.status === "SUCCESS") {
        toast.success("Success", {
          description: "Congrats, your review has been successfully edited",
        });

        setEditReview(false);
      } else {
        toast.error("Error", {
          description: "Edit unable to be made. Please try again later",
        });
      }
      setEditReviewLoader(false);
      setEditReview(false);
      router.refresh();
      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
      });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        setEditReviewLoader(false);
        console.error(error);
        setError("Please enter a valid review between 10 to 2000 characters");
        toast.error("Error", {
          description: "Please check your input and try again",
        });

        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      } else {
        setEditReviewLoader(false);
        toast.error("Error", {
          description: "An unexpected error occured. Please try again",
        });
        return {
          ...prevState,
          error: "An unexpected Error occured",
          status: "ERROR",
        };
      }
    }
  };

  const handleSubmitFlagReview = async () => {
    setFlagPending(true);
    setFlagged(true);

    if (!flaggedReason) {
      setFlagged(false);
      setDropFlag(false);
      setFlagPending(false);
      setFlaggedReason("");
      return toast.error("Error", {
        description: "Please select a reason to flag the review",
      });
    }

    try {
      setDropFlag(false);
      if (!userId) {
        setFlagged(false);
        setFlagPending(false);
        Cookies.set("flaggedReviewId", _id as string, { expires: 1 });
        Cookies.set("flaggedReason", flaggedReason, { expires: 1 });
        const callbackUrl = `/product/${productId}`;
        router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return toast.info("Please sign in", {
          description: "Sign in to continue flagging the review",
        });
      }
      const flaggedReasonSanitized = flaggedReason
        .toLowerCase()
        .replace(/\s+/g, "");
      const result = await writeFlaggedReview(
        userId,
        _id as string,
        flaggedReasonSanitized
      );

      if (result.status === "SUCCESS") {
        setFlagPending(false);
        setFlaggedReason("");
        revalidateFlaggedReviews();
        toast.success("Success", {
          description: "Review has been flagged successfully",
        });
        return parseServerActionResponse({
          status: "SUCCESS",
          error: "",
        });
      }
      setFlagged(false);
      setFlagPending(false);
      revalidateFlaggedReviews();
      return parseServerActionResponse({
        status: "ERROR",
        error: "An unexpected error occured",
      });
    } catch (error) {
      console.error(error);
      setFlagged(false);
      setFlagPending(false);
      revalidateFlaggedReviews();
      toast.error("Error", {
        description: "An unexpected error occured. Please try again",
      });
      return parseServerActionResponse({
        status: "ERROR",
        error: "An unexpected Error",
      });
    }
  };

  const handleDeleteFlag = async () => {
    try {
      setFlagPending(true);
      const result = await deleteReviewFlag(userId as string, _id as string);
      if (result.status === "SUCCESS") {
        setFlagPending(false);
        setFlagged(false);
        setDropFlag(false);
        toast.success("Success", {
          description: "Flag has been successfully deleted",
        });
        revalidateFlaggedReviews();
        return parseServerActionResponse({
          status: "SUCCESS",
          error: "",
        });
      }
      setFlagPending(false);
      setFlagged(true);
      revalidateFlaggedReviews();
      toast.error("Error", {
        description: "An unexpected error occured",
      });
      return parseServerActionResponse({
        status: "ERROR",
        error: "An unexpected error occured",
      });
    } catch (error) {
      setDropFlag(false);
      setFlagPending(false);
      revalidateFlaggedReviews();
      console.error(error);
      toast.error("Error", {
        description: "An unexpected error occured. Please try again",
      });
      return parseServerActionResponse({
        status: "ERROR",
        error: "An unexpected Error",
      });
    }
  };

  const [_state, formAciton, isPending] = useActionState(handleFromSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="flex flex-col w-full gap-2">
      {(isPending || editReviewLoader || flagPending || deleteReviewLoader) && (
        <LoaderOverlay />
      )}
      <div className="flex flex-col gap-1">
        {reviewTitle && (
          <h2 className="font-plex-sans font-medium text-[20px] sm:text-[22px] md:text-[20px] lg:text-[22px]">
            {reviewTitle.slice(0, 50)}
          </h2>
        )}
        <div className="flex flex-row font-plex-sans items-center text-[18px] gap-2">
          <ReviewStars reviews={productReview} />
          {isEditedReview && (
            <span className="font-plex-sans font-light text-[10px] sm:text-[12px] pr-2">
              Edited
            </span>
          )}
          <p className="font-plex-sans font-light text-[12px] sm:text-[14px]">
            {formatDate(
              isEditedReview ? (_updatedAt as string) : (_createdAt as string)
            )}
          </p>
          <div className="relative" ref={flaggedRef}>
            <Flag
              className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:text-gray-600 transition duration-200 ${flagged ? "fill-primary-400" : "fill-none"}`}
            />

            {dropFlag && (
              <div
                className="absolute z-50 min-w-[150px] right-0 mt-2 w-32 text-white bg-third-200 rounded-md shadow-lg font-plex-sans font-regular text-left"
                ref={flaggedDropDownRef}
              >
                {!flagged ? (
                  <div>
                    {Object.entries(flaggedReasons).map(([, value], index) => (
                      <button
                        key={index}
                        className="block w-full text-[10px] sm:text-[12px] text-left px-4 py-2 transition hover:bg-gray-700 rounded duration-200 ease-in-out"
                        onClick={() =>
                          setFlaggedReason((prev) =>
                            value !== prev ? value : ""
                          )
                        }
                      >
                        <div className="flex flex-row items-center p-1">
                          {flaggedReason == value && (
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 no-shrink mr-2" />
                          )}
                          {value}
                        </div>
                      </button>
                    ))}
                    <div className="flex flex-col ">
                      <Button
                        type="button"
                        className="w-full max-w-[300px] h-[30px] font-plex-sans font-regular text-[12px] sm:text-[14px] text-left transition hover:bg-gray-700 duration-200"
                        onClick={handleSubmitFlagReview}
                        disabled={flagPending}
                      >
                        {flagPending ? "Flagging..." : "Submit Flag"}

                        <Send />
                      </Button>
                      <Button
                        type="button"
                        className="w-full max-w-[300px] h-[30px] font-plex-sans font-regular text-[12px] sm:text-[14px] text-left"
                        variant="destructive"
                        disabled={flagPending}
                        onClick={() => {
                          setDropFlag(false);
                          setFlaggedReason("");
                        }}
                      >
                        Cancel Flag
                        <Ban />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    className="w-full max-w-[300px] h-[30px] font-plex-sans font-regular text-[12px] sm:text-[14px] text-left"
                    variant="destructive"
                    disabled={flagPending}
                    onClick={() => handleDeleteFlag()}
                  >
                    {flagPending ? (
                      "Deleting ..."
                    ) : (
                      <>
                        Delete Flag <Ban />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
          {reviewIsUserReview && (
            <div className="relative" ref={ellipseRef}>
              <EllipsisVertical className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer hover:text-gray-600 transition duration-200" />
              {dropEllipse && (
                <div
                  className="absolute right-0 mt-2 w-32 text-white bg-third-200 rounded-md shadow-lg p-2 space-y-1 font-plex-sans font-regular text-[12px]"
                  ref={ellipseDropRef}
                >
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                    onClick={handleEllipseEditSubmit}
                  >
                    {editReview ? "Submit Edit" : "Edit Review"}
                  </button>
                  {editReview && (
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                      onClick={() => handleDeleteEdit()}
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                    onClick={handleDeleteReview}
                  >
                    Delete Review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-plex-sans font-light text-[14px] sm:text-[16px] pt-3">
          {nickname}
        </p>
        {editReview != false && reviewIsUserReview ? (
          <div>
            <Form action={formAciton} ref={formRef} className="w-full h-auto">
              <Textarea
                id="description"
                name="review"
                placeholder="Your Edit"
                className="w-full h-28"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
              {error != null && (
                <span className="product-write-error">{error}</span>
              )}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isPending || !reviewText}
                  className="w-full max-w-[300px] h-[30px]"
                  onClick={() => setEditReviewLoader(true)}
                >
                  {editReviewLoader ? "Submitting..." : "Submit your Edit"}
                  <Send />
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    handleDeleteEdit();
                  }}
                  disabled={isPending}
                  className="w-full max-w-[300px] h-[30px]"
                  variant="destructive"
                >
                  Cancel Edit
                  <Ban />
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <p className="font-plex-sans font-regular text-[16px] sm:text-[18px] md:text-[20px]">
            {review}
          </p>
        )}

        {photo && (
          <img
            src={urlFor(photo).url()}
            alt="review photo"
            width={200}
            height={250}
            className="object-contain w-full h-full max-w-[400px] max-h-[600px] overflow-hidden"
          />
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
