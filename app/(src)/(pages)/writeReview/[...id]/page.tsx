import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";
import { auth } from "@/auth";

export const experimental_ppr = true;

const WriteReview = async ({ params }: { params: { id: string } }) => {
  const productId = (await params).id || "/";
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return redirect(
      `/api/auth/signin/callbackUrl=${encodeURIComponent(`/writeReview/${productId}`)}`
    );
  }

  // if not authenticated, redirect to sign in
  return (
    <div className="flex flex-row w-full pt-[4rem] md:pt-0 h-[calc(100vh-8rem)]">
      <Suspense fallback={<div>Loading review form... </div>}>
        <ReviewForm user={user} productId={productId} />
      </Suspense>
      <div className="hidden md:flex flex-col w-[50%] p-5 gap-8">
        <div className="flex flex-col gap-3">
          <p className="font-plex-sans font-medium text-[20px]">
            Writing the perfect Review
          </p>
          <ul className="font-plex-sans font-regular text-[14px] list-disc pl-5 space-y-1">
            <li>
              <p>
                Be specific and relevant to the product - detail is great, but
                make sure the length of the review is digestible
              </p>
            </li>
            <li>
              <p>Do not include any personal information</p>
            </li>
            <li>
              <p>
                Be respectful - Write in a respectful and appropriate manner
              </p>
            </li>
            <li>
              <p>
                Avoid prices and promotions as these a temporary and might not
                be there when people read your review.
              </p>
            </li>
            <li>
              <p>
                Focus on the product - if you have an issue not related to the
                product itself (e.g. delivery time, price), please direct this
                to our customer service team to ensure they can help you.
              </p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-plex-sans font-medium text-[20px]">
            Sharing the perfect photo
          </p>
          <ul className="font-plex-sans font-regular text-[14px] list-disc pl-5 space-y-1">
            <li>
              <p>You can upload photos in PNG, JPEG, and WEBP format</p>
            </li>
            <li>
              <p>The photo you upload can be a maximum size of 5 MB</p>
            </li>
            <li>
              <p>You should only upload images where you own the copyright</p>
            </li>
            <li>
              <p>Offensive or inappropriate photos are not allowed</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
