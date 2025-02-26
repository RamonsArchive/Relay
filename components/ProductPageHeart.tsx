"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { handleHeartWrite } from "@/sanity/lib/actions";

const ProductPageHeart = ({
  heartedProducts,
  isHearted,
  path,
  userId,
  callbackUrl,
}: {
  heartedProducts: any;
  isHearted: boolean;
  path: string;
  userId: string | null;
  callbackUrl: string;
}) => {
  const [hearted, setHearted] = useState<boolean>(isHearted);
  const router = useRouter();

  useEffect(() => {
    setHearted(isHearted);
  }, [isHearted]);

  const toggleHeart = async () => {
    console.log("not yet passed auth check");
    if (!userId) {
      // get product Id
      Cookies.set("heartedProductId", path, { expires: 1 });
      Cookies.set("heartedAction", "true", { expires: 1 });
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    console.log("passed auth check");
    try {
      const newHearted = !hearted;
      setHearted(newHearted);
      console.log("Going to handleHeartWrite");
      await handleHeartWrite(path, newHearted as boolean);
      console.log("Hearted action executed");
      router.refresh();
    } catch (error) {
      console.error("Failed to execute hearted action:", error);
    }
  };

  return (
    <div onClick={toggleHeart} className="cursor-pointer">
      <Heart
        size={24}
        className={hearted ? "text-primary-200" : "text-black"}
        fill={hearted ? "#004BFE" : "none"}
      />
    </div>
  );
};

export default ProductPageHeart;
