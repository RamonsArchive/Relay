"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { writeFlaggedReview } from "@/sanity/lib/actions";
import { toast } from "sonner";
import { revalidateFlaggedReviews } from "@/lib/serverActions";

const AutoFlagReviewWrapper = ({ userId }: { userId: string | null }) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!userId || hasRun) {
      return;
    }
    setHasRun(true);
    const flaggedReviewId = Cookies.get("flaggedReviewId");
    const flaggedReason = Cookies.get("flaggedReason");
    Cookies.remove("flaggedReviewId");
    Cookies.remove("flaggedReason");

    if (flaggedReviewId && flaggedReason) {
      const flagReview = async () => {
        const flaggedReasonSanitized = flaggedReason
          .toLowerCase()
          .replace(/\s+/g, "");
        const result = await writeFlaggedReview(
          userId,
          flaggedReviewId,
          flaggedReasonSanitized
        );

        if (result.status === "SUCCESS") {
          toast.success("Success", {
            description: "Review has been flagged successfully",
          });
          revalidateFlaggedReviews();
        } else {
          toast.error("Error", {
            description:
              "Review was unable to be flagged. Please try again later",
          });
        }
      };
      flagReview();
    }

    return () => {};
  }, [userId]);

  return null;
};

export default AutoFlagReviewWrapper;
