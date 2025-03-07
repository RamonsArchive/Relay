"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { handleHeartWrite } from "@/sanity/lib/actions";
import { toast } from "sonner";

const ProductHeart = ({
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
        const result = await handleHeartWrite(
          userId as string,
          heartedProductId as string,
          !isHearted
        );

        if (result.status == "SUCCESS") {
          toast.success("Success", {
            description: "Product has been hearted successfully",
          });
        }
        Cookies.remove("heartedProductId");
      } catch (error) {
        setHearted(false);
        toast.error("Error", {
          description:
            "Product was unable to be hearted. Please try again later",
        });
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
      toast.info("Please sign in", {
        description: "Sign in to save heart",
      });
      return;
    }
    try {
      const newHearted = !hearted;
      setHearted(newHearted);
      console.log("user id", userId);
      console.log("product id", productId);
      const result = await handleHeartWrite(
        userId,
        productId,
        newHearted as boolean
      );
      console.log("Heart result", result);
      if (result.status == "SUCCESS") {
        if (hearted) {
          toast.success("Success", {
            description: "Product has been unhearted successfully",
          });
        } else {
          toast.success("Success", {
            description: "Product has been hearted successfully",
          });
        }
        router.refresh();
      } else {
        setHearted(!newHearted);
        toast.error("Error", {
          description:
            "Product has not able to be hearted. Please try again later",
        });
      }
    } catch (error) {
      setHearted(hearted);
      console.error("Failed to execute hearted action:", error);
      toast.error("Error", {
        description:
          "Product was unable to be hearted or unhearted. Please try again later",
      });
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

export default ProductHeart;
