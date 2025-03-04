"use client";
import React, { useActionState } from "react";
import { useState, useRef, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import ReviewStars from "./ReviewStars";
import { urlFor } from "@/sanity/lib/client";
import { ReviewType } from "@/globalTypes";
import { EllipsisVertical, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { reviewSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import Form from "next/form";
import { Button } from "./ui/button";
import {
  uploadImageStringToSanity,
  writeReviewEdit,
} from "@/sanity/lib/actions";

const ReviewCard = ({
  productReview,
  userReview,
  editReview,
  setEditReview,
}: {
  productReview: ReviewType;
  userReview: ReviewType;
  editReview: boolean;
  setEditReview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [dropEllipse, setDropEllipse] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const ellipseDropRef = useRef<HTMLDivElement | null>(null);

  const handleToggleEllipse = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    setDropEllipse((prev) => !prev);
  };

  const { reviewTitle, review, photo, nickname, _createdAt, _updatedAt, _id } =
    productReview;
  const [reviewText, setReviewText] = useState(review);

  const productUserId = productReview?.user?._id;
  const userReviewId = userReview?.user?._id;

  const isEditedReview = _createdAt !== _updatedAt;
  console.log("isEditedReview", isEditedReview);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ellipseDropRef.current &&
        !ellipseDropRef.current.contains(event.target as Node)
      ) {
        setDropEllipse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleEllipseSaveEdit = () => {
    console.log("Clicked ellipse save edit");
    console.log("Edit review", editReview);
    console.log("Form ref", formRef.current);
    if (editReview && formRef.current) {
      formRef.current.requestSubmit();
      // setEditReview(false);
    } else {
      setEditReview(true);
    }
    return;
  };

  const handleDeleteEdit = () => {
    console.log("Deleting edit");
    setEditReview(false);
    setReviewText(review);
    console.log(editReview);
  };

  const handleFromSubmit = async (prevState: any, formData: FormData) => {
    try {
      const editData = formData.get("review");
      await reviewSchema.parse(editData);
      console.log("Going to write edit", editData);
      const result = await writeReviewEdit(_id as string, editData as string);
      if (result.status === "SUCCESS") {
        toast.success("Success", {
          description: "Congrats, your review has been successfully edited",
        });
        router.refresh();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("Please enter a valid review between 10 to 2000 characters");
        toast.error("Error", {
          description: "Please check your input and try again",
        });
        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      } else {
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

  const [state, formAciton, isPending] = useActionState(handleFromSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col ">
        {reviewTitle && (
          <h2 className="font-plex-sans font-medium text-[20px]">
            {reviewTitle.slice(0, 50)}
          </h2>
        )}
        <div className="flex flex-row font-plex-sans items-center text-[18px] gap-2">
          <ReviewStars reviews={productReview} />
          {isEditedReview && (
            <span className="font-plex-sans font-light text-[12px] pr-2">
              Edited
            </span>
          )}
          <p className="font-plex-sans font-light text-[14px]">
            {formatDate(
              isEditedReview ? (_updatedAt as string) : (_createdAt as string)
            )}
          </p>
          {productUserId === userReviewId && (
            <div className="relative" onClick={handleToggleEllipse}>
              <EllipsisVertical className="w-8 h-8 cursor-pointer hover:text-gray-600 transition duration-200" />
              {dropEllipse && (
                <div
                  className="absolute right-0 mt-2 w-32 text-white bg-third-200 rounded-md shadow-lg p-2 space-y-1 font-plex-sans font-regular text-[12px]"
                  ref={ellipseDropRef}
                >
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                    onClick={handleEllipseSaveEdit}
                  >
                    {editReview ? "Submit Edit" : "Edit Review"}
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
                    Delete Review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-plex-sans font-regular text-[18px]">{nickname}</p>
        {editReview != false && productUserId == userReviewId ? (
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
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-[30px]"
              >
                {isPending ? "Submitting..." : "Submit your Edit"}
                <Send />
              </Button>
              <Button
                type="button"
                onClick={() => handleDeleteEdit()}
                disabled={isPending}
                className="w-full h-[30px]"
              >
                {isPending ? "Cancelling..." : "Cancel Edit"}
                <Send />
              </Button>
            </Form>
          </div>
        ) : (
          <p className="font-plex-sans font-regular text-[20px]">{review}</p>
        )}

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
