"use client";
import Form from "next/form";
import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { Circle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { reviewSchema } from "@/lib/validation";
import { z } from "zod";
import { uploadImageToSanity, writeReview } from "@/sanity/lib/actions";
import { ActionState, SanityImage } from "@/globalTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { verifyNoUserReview } from "@/lib/serverActions";
import { User } from "next-auth";

const ReviewForm = ({ productId, user }: { productId: string; user: User }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string | number>>({});
  const [mainRating, setMainRating] = useState(-1);
  const [wouldRecommend, setWouldRecommend] = useState(-1);
  const [sizeRating, setSizeRating] = useState(-1);
  const [widthRating, setWidthRating] = useState(-1);
  const [comfortRating, setComfortRating] = useState(-1);
  const [qualityRating, setQualityRating] = useState(-1);
  const [valueRating, setValueRating] = useState(-1);

  const handleFormSubmit = async (
    prevState: ActionState,
    formData: FormData
  ) => {
    const photoFile = formData.get("photo");
    let photoRef = null;
    if (!user) {
      return {
        ...prevState,
        error: "User not found",
        status: "ERROR",
      };
    }
    if (photoFile instanceof File && photoFile.size > 0) {
      if (photoFile.size > 5 * 1024 * 1024) {
        console.error("File is too large! Must be under 5MB.");
        setErrors({ photo: "File size exceeds 5MB limit." });
        return {
          ...prevState,
          error: "File size exceeds 5MB limit.",
          status: "ERROR",
        };
      }

      try {
        const uploadImageId = await uploadImageToSanity(photoFile);
        if (uploadImageId) {
          photoRef = {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: uploadImageId,
            },
          };
        }
      } catch (error) {
        console.error("Error uploading image", error);
        return;
      }
    }
    try {
      const recommendValue = formData.get("wouldRecommend");
      const reccomendBoolean =
        recommendValue == null || Number(recommendValue) == -1
          ? undefined
          : Number(recommendValue) === 1;

      const reviewData = {
        mainRating: Number(formData.get("mainRating")) || undefined,
        wouldRecommend: reccomendBoolean,
        review: formData.get("review")?.toString() || undefined,
        reviewTitle: formData.get("reviewTitle")?.toString() || undefined,
        sizeRating: Number(formData.get("sizeRating")) || undefined,
        widthRating: Number(formData.get("widthRating")) || undefined,
        comfortRating: Number(formData.get("comfortRating")) || undefined,
        qualityRating: Number(formData.get("qualityRating")) || undefined,
        valueRating: Number(formData.get("valueRating")) || undefined,
        photo: (photoRef as SanityImage) || undefined,
        nickname: formData.get("nickname")?.toString() || undefined,
        email: formData.get("email")?.toString() || undefined,
      };

      await reviewSchema.parseAsync(reviewData);
      const existingReview = await verifyNoUserReview(
        productId[0],
        user?.id as string
      );
      if (existingReview.status == "ERROR") {
        toast.error("Error", {
          description: "You already wrote a review for this product",
        });
        router.push(`/product/${productId}`);
        return existingReview;
      }
      const result = await writeReview(
        (user?.id as string).toString(),
        productId.toString(),
        reviewData
      );
      if (result.status === "SUCCESS") {
        toast.success("Success", {
          description: "Congrats, your review was a success",
        });
        router.push(`/product/${productId}`);
      } else {
        toast.error("Error", {
          description: "An unexpected error occured. Please try again",
        });
        router.refresh();
      }
    } catch (errors) {
      console.error(errors);
      if (errors instanceof z.ZodError) {
        const fieldErrors = errors.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Error", {
          description: "Please check your inputs and try again",
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

  const [_state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="flex flex-col w-full items-center md:w-[50%] h-full overflow-y-auto justify-start gap-5 pb-10 scrollbar-hidden">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
          <Loader />
        </div>
      )}

      <div className="flex w-full p-5">
        <Form
          action={formAction}
          className="flex flex-col gap-8 w-full max-w-lg mx-auto"
        >
          <h1 className="flex font-plex-sans font-medium justify-start text-[22px] sm:text-[24px] md:text-[28px]">
            Write your Review!
          </h1>
          <div className="product-write-section">
            <label className="product-write-label ">Overall Rating</label>
            <div className="flex flex-row gap-3">
              {[...Array(5)].map((_key, i) => (
                <Star
                  key={i}
                  className={`cursor-pointer size-[24px] md:size-[28px] ${i < mainRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  onClick={() => setMainRating(i + 1)}
                />
              ))}
            </div>
            {errors.mainRating && (
              <span className="product-write-error">
                Rating must be from 1 to 5 stars
              </span>
            )}
            <input type="hidden" name="mainRating" value={mainRating} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label">
              Would you Recommend this Product?
            </label>
            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 font-plex-sans text-[14px] text-[12px] sm:text-[14px] md:text-[16px]">
              <Circle
                className={`size-[22px] md:size-[24px] ${wouldRecommend == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setWouldRecommend(1)}
              />
              <span>Yes</span>
              <Circle
                size={24}
                className={`size-[22px] md:size-[24px] ${wouldRecommend == 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setWouldRecommend(0)}
              />
              <span>No</span>
            </div>
            {errors.wouldRecommend && (
              <span className="product-write-error">
                Recommend must be yes or no
              </span>
            )}
            <input type="hidden" name="wouldRecommend" value={wouldRecommend} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label">Share your Experience</label>
            <span className="font-plex-sans font-light text-[12px] sm:text-[14px]">
              Tell others about the product
            </span>
            <Textarea
              id="description"
              name="review"
              placeholder="Your Review"
              className="w-full h-20 sm:h-28 text-[14px] sm:text-[16px] md:text-[18px] font-plex-sans max-w-lg"
              required
            />
            {errors.review && (
              <span className="product-write-error">{errors.review}</span>
            )}
            <span className="font-plex sans font-light text-[12px] sm:text-[14px]">
              Write a one sentence opinion of the product for the review title.
            </span>
            <Input
              id="title"
              name="reviewTitle"
              type="title"
              placeholder="Review title"
              className="text-[14px] sm:text-[16px] md:text-[18px] font-plex-sans max-w-lg"
              required
            />
            {errors.reviewTitle && (
              <span className="product-write-error">{errors.reviewTitle}</span>
            )}
          </div>

          <div className="product-write-section">
            <label className="product-write-label ">Width Rating</label>
            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 font-plex-sans text-[12px] sm:text-[14px] md:text-[16px]">
              <Circle
                className={`size-[22px] md:size-[24px] ${widthRating == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setWidthRating(1)}
              />
              <span>Runs Skinny</span>
              <Circle
                className={`size-[22px] md:size-[24px] ${widthRating == 2 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setWidthRating(2)}
              />
              <span>True to Width</span>

              <Circle
                className={`size-[22px] md:size-[24px] ${widthRating == 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setWidthRating(3)}
              />
              <span>Runs Wide</span>
            </div>
            {errors.widthRating && (
              <span className="product-write-error">
                Must check one of the three options
              </span>
            )}
            <input type="hidden" name="widthRating" value={widthRating} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label ">Comfort Rating</label>
            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 font-plex-sans text-[12px] sm:text-[14px] md:text-[16px]">
              <Circle
                className={`size-[22px] md:size-[24px] ${comfortRating == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setComfortRating(1)}
              />
              <span>Uncomfortable</span>
              <Circle
                className={`size-[22px] md:size-[24px] ${comfortRating == 2 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setComfortRating(2)}
              />
              <span>Average</span>

              <Circle
                className={`size-[22px] md:size-[24px] ${comfortRating == 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setComfortRating(3)}
              />
              <span>Very Comfortable</span>
            </div>
            {errors.comfortRating && (
              <span className="product-write-error">
                Must check on of the three options
              </span>
            )}
            <input type="hidden" name="comfortRating" value={comfortRating} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label ">Size Rating</label>
            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 font-plex-sans text-[12px] sm:text-[14px] md:text-[16px]">
              <Circle
                className={`size-[22px] md:size-[24px] ${sizeRating == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setSizeRating(1)}
              />
              <span>Runs small</span>
              <Circle
                className={`size-[22px] md:size-[24px] ${sizeRating == 2 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setSizeRating(2)}
              />
              <span>True to Size</span>

              <Circle
                className={`size-[22px] md:size-[24px] ${sizeRating == 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setSizeRating(3)}
              />
              <span>Runs Big</span>
            </div>
            {errors.sizeRating && (
              <span className="product-write-error">
                Must check on of the three options
              </span>
            )}
            <input type="hidden" name="sizeRating" value={sizeRating} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label ">Quality Rating</label>
            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 text-[12px] sm:text-[14px] md:text-[16px]">
              <Circle
                className={`size-[22px] md:size-[24px] ${qualityRating == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setQualityRating(1)}
              />
              <span>Poor</span>
              <Circle
                className={`size-[22px] md:size-[24px] ${qualityRating == 2 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setQualityRating(2)}
              />
              <span>Average</span>

              <Circle
                className={`size-[22px] md:size-[24px] ${qualityRating == 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setQualityRating(3)}
              />
              <span>Great</span>
            </div>
            {errors.qualityRating && (
              <span className="product-write-error">
                Must check one of the three options
              </span>
            )}
            <input type="hidden" name="qualityRating" value={qualityRating} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label ">Value Rating</label>
            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 text-[12px] sm:text-[14px] md:text-[16px]">
              <Circle
                className={`size-[22px] md:size-[24px] ${valueRating == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setValueRating(1)}
              />
              <span>Poor</span>
              <Circle
                className={`size-[22px] md:size-[24px] ${valueRating == 2 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setValueRating(2)}
              />
              <span>Average</span>

              <Circle
                className={`size-[22px] md:size-[24px] ${valueRating == 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                onClick={() => setValueRating(3)}
              />
              <span>Great</span>
            </div>
            {errors.valueRating && (
              <span className="product-write-error">
                Must check one of the three options
              </span>
            )}
            <input type="hidden" name="valueRating" value={valueRating} />
          </div>

          <div className="product-write-section">
            <label className="product-write-label">
              Optional Photo of the product
            </label>
            <Input
              id="photo"
              name="photo"
              type="file"
              placeholder="photo"
              className="text-[14px] sm:text-[16px] md:text-[18px] font-plex-sans max-w-lg"
            />
            {errors.photo && (
              <span className="product-write-error">{errors.photo}</span>
            )}
          </div>

          <div className="product-write-section">
            <label className="product-write-label">Nickname</label>
            <Input
              id="nickname"
              name="nickname"
              type="title"
              placeholder="nickname"
              className="text-[14px] sm:text-[16px] md:text-[18px] font-plex-sans max-w-lg"
              required
            />
            {errors.nickname && (
              <span className="product-write-error">{errors.nickname}</span>
            )}
          </div>

          <div className="product-write-section">
            <label className="product-write-label">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              defaultValue={user?.email || ""}
              className="text-[14px] sm:text-[16px] md:text-[18px] font-plex-sans max-w-lg"
              required
            />
            {errors.email && (
              <span className="product-write-error">{errors.email}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full max-w-lg h-[40px]"
          >
            {isPending ? "Submitting..." : "Submit your Review"}
            <Send />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ReviewForm;
