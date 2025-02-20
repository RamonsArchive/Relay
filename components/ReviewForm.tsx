"use client";
import Form from "next/form";
import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { Circle } from 'lucide-react';
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { reviewSchmea }  from "@/lib/validation";
import { z } from "zod";

const ReviewForm = ({user}: {user: any}) => {
  const [errors, setErrors] = useState<Record<string, string | number>>({});
  const [mainRating, setMainRating] = useState(-1);
  const [recommend, setRecommend] = useState(-1);
  const [sizeRating, setSizeRating] = useState(-1);
  const [widthRating, setWidthRating] = useState(-1);
  const [comfortRating, setComfortRating] = useState(-1);
  const [qualityRating, setQualityRating] = useState(-1);
  const [valueRating, setValueRating] = useState(-1);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try{
      console.log(formData.get("photo"));
      const reviewData = {
        mainRating: Number(formData.get("mainRating")),
        recommend: Number(formData.get("recommend")),
        review: formData.get("review"),
        reviewTitle: formData.get("title"),
        sizeRating: Number(formData.get("sizeRating")),
        widthRating: Number(formData.get("widthRating")),
        comfortRating: Number(formData.get("comfortRating")),
        qualityRating: Number(formData.get("qualityRating")),
        valueRating: Number(formData.get("valueRating")),
        photo: formData.get("photo") instanceof(File) ? formData.get("photo") : null,
        email: formData.get("email"),
      }

      console.log(reviewData);
      await reviewSchmea.parseAsync(reviewData);
      //const result = await createReview(prevState, reviewData);
      // console.log(result);
    } catch (errors) {
      if (errors instanceof z.ZodError) {
        const fieldErrors = errors.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return {...prevState, error: "Validation Failed", status: "ERROR"};
      } else {
        return {...prevState, error: "An unexpected Error occured", status: "ERROR"};
      }
    };
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="flex flex-col w-[50%] h-auto overflow-y-auto items-center gap-5 p-5 pb-20 "> 
      <h1 className="font-plex-sans font-medium text-[28px]">Write your Review!</h1>
      <Form action={formAction} className="flex flex-col gap-8">
        <div className="product-write-section">
          <label className="product-write-label ">Overall Rating</label>
          <div className="flex flex-row gap-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className={`cursor-pointer ${i <= mainRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => setMainRating(i)}
            />
          ))}
          </div>
          {errors.mainRating && <span className="product-write-error">Rating must be from 1 to 5 stars</span>}
          <input type="hidden" name="mainRating" value={mainRating}/>
        </div>

        <div className="product-write-section"> 
          <label className="product-write-label">Would you Reccomend this Product?</label> 
          <div className="flex flex-row gap-5"> 
          <Circle size={24} className={`${recommend == 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300" }`} onClick={() => setRecommend(1)}/>
          <span>Yes</span>
          <Circle size={24} className={`${recommend == 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-300" }`} onClick={() => setRecommend(0)}/>
          <span>No</span>
          </div>
          {errors.recommend && <span className="product-write-error">Recommend must be yes or no</span>}
          <input type="hidden" name="recommend" value={recommend} />
        </div>

        <div className="product-write-section">
          <label className="product-write-label">Share your Experience</label>
          <span className="font-plex sans font-light text-[14px]">Tell other's about the product</span>
          <Textarea id="description" name="review" placeholder="Your Review" className="w-full h-28" required />
          {errors.review && <span className="product-write-error">{errors.review}</span>}
          <span className="font-plex sans font-light text-[14px]">Write a one sentence opinion of the product for the review title.</span>
          <Input id="title" name="title" type="title" placeholder="Review title"required/>
          {errors.title && <span className="product-write-error">{errors.title}</span>}
        </div>

        <div className="product-write-section">
          <label className="product-write-label ">Width Rating</label>
          <div className="flex flex-row gap-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className={`cursor-pointer ${i <= widthRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => setWidthRating(i)}
            />
          ))}
          </div>
          {errors.widthRating && <span className="product-write-error">Rating must be from 1 to 5 stars</span>}
          <input type="hidden" name="widthRating" value={widthRating} />
        </div>

        <div className="product-write-section">
          <label className="product-write-label ">Comfort Rating</label>
          <div className="flex flex-row gap-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className={`cursor-pointer ${i <= comfortRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => setComfortRating(i)}
            />
          ))}
          </div>
          {errors.comfortRating && <span className="product-write-error">Rating must be from 1 to 5 stars</span>}
          <input type="hidden" name="comfortRating" value={comfortRating} />
        </div>

        <div className="product-write-section">
          <label className="product-write-label ">Size Rating</label>
          <div className="flex flex-row gap-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className={`cursor-pointer ${i <= sizeRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => setSizeRating(i)}
            />
          ))}
          </div>
          {errors.sizeRating && <span className="product-write-error">Rating must be from 1 to 5 stars</span>}
          <input type="hidden" name="sizeRating" value={sizeRating} />
        </div>

        <div className="product-write-section">
          <label className="product-write-label ">Quality Rating</label>
          <div className="flex flex-row gap-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className={`cursor-pointer ${i <= qualityRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => setQualityRating(i)}
            />
          ))}
          </div>
          {errors.qualityRating && <span className="product-write-error">Rating must be from 1 to 5 stars</span>}
          <input type="hidden" name="qualityRating" value={qualityRating} />
        </div>

        <div className="product-write-section">
          <label className="product-write-label ">Value Rating</label>
          <div className="flex flex-row gap-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className={`cursor-pointer ${i <= valueRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => setValueRating(i)}
            />
          ))}
          </div>
          {errors.valueRating && <span className="product-write-error">Rating must be from 1 to 5 stars</span>}
          <input type="hidden" name="valueRating" value={valueRating} />
        </div>

        <div className="product-write-section"> 
          <label className="product-write-label">Optional Photo of the product</label>
          <Input id="photo" name="photo" type="file" placeholder="photo" />
          {errors.photo && <span className="product-write-error">{errors.photo}</span>}
        </div>

        <div className="product-write-section"> 
          <label className="product-write-label">Nickname</label>
          <Input id="nickname" name="nickname" type="title" placeholder="nickname" required/>
          {errors.nickname && <span className="product-write-error">{errors.nickname}</span>}
        </div>

        <div className="product-write-section"> 
          <label className="product-write-label">Email</label>
          <Input id="email" name="email" type="email" placeholder="email" defaultValue={user?.email || ""} required/>
          {errors.email && <span className="product-write-error">{errors.email}</span>}
        </div>

        <Button type="submit" disabled={isPending} className="w-full h-[40px]">
          {isPending ? "Submitting..." : "Submit your Review"}
          <Send />
        </Button>
      </Form>
    </div>
      
   
  );
};


export default ReviewForm;
