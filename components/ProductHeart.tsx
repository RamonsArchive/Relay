"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { handleHeartWrite } from "@/sanity/lib/actions";

const ProductPageHeart = ({
  isHearted,
  productId,
  userId,
  callbackUrl,
}: {
  isHearted: boolean;
  productId: string;
  userId: string | null;
  callbackUrl: string;
}) => {
  const [hearted, setHearted] = useState<boolean>(isHearted);
  const router = useRouter();

  useEffect(() => {
    setHearted(isHearted);
  }, [isHearted, userId, productId]);

  useEffect(() => {
    //if (heartOnCallBack.current) return;
    const setHeart = async () => {
      // heartOnCallBack.current = true;
      if (isHearted) {
        Cookies.remove("heartedProductId");
        return;
      }
      const heartedProductId = Cookies.get("heartedProductId");
      try {
        setHearted(true);
        await handleHeartWrite(
          userId as string,
          heartedProductId as string,
          !isHearted
        );
        Cookies.remove("heartedProductId");
      } catch (error) {
        setHearted(false);
        Cookies.remove("heartedProductId");
      }
    };

    if (
      Cookies.get("heartedProductId") &&
      Cookies.get("heartedProductId") == productId
    ) {
      // setHeart();
      setTimeout(() => {
        setHeart();
      }, 0);
    }
  }, []); // Runs once when component mounts

  const toggleHeart = async () => {
    if (!userId) {
      // get product Id
      Cookies.set("heartedProductId", productId, { expires: 1 });
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    try {
      const newHearted = !hearted;
      setHearted(newHearted);
      await handleHeartWrite(userId, productId, newHearted as boolean);
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
