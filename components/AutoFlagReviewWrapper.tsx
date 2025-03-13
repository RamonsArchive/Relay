"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { writeFlaggedReview } from "@/sanity/lib/actions";
import { toast } from "sonner";
import { revalidateFlaggedReviews } from "@/lib/serverActions";
import { parseServerActionResponse } from "@/lib/utils";

const AutoFlagReviewWrapper = ({ userId }: { userId: string | null }) => {
  console.log("AutoFlagReviewWrapper userId", userId);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!userId || hasRun) {
      return;
    }
    setHasRun(true);
    console.log("Checking flagged review cookies...");
    const flaggedReviewId = Cookies.get("flaggedReviewId");
    const flaggedReason = Cookies.get("flaggedReason");

    if (flaggedReviewId && flaggedReason) {
      console.log("Auto-flagging review...");

      const flagReview = async () => {
        const result = await writeFlaggedReview(
          userId,
          flaggedReviewId,
          flaggedReason
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

        Cookies.remove("flaggedReviewId");
        Cookies.remove("flaggedReason");
      };

      flagReview();
      Cookies.remove("flaggedReviewId");
      Cookies.remove("flaggedReason");
    }

    return () => {}; // ✅ Return an empty function to satisfy React's cleanup requirement
  }, [userId]);

  return null; // ✅ Ensure it returns null instead of an object
};

export default AutoFlagReviewWrapper;
