import React from "react";
import { redirect } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";

const WriteReview = ({ params }: { params: { id: string } }) => {
  const path = params.id || "/";

  // if not authenticated, redirect to sign in
  return (
    <div>
      <ReviewForm />
    </div>
  );
};

export default WriteReview;
