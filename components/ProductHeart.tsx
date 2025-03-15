"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { handleHeartWrite } from "@/sanity/lib/actions";
import { toast } from "sonner";
import { revalidateHeartedProducts } from "@/lib/serverActions";

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
    router.refresh();
    //if (heartOnCallBack.current) return;
    const setHeart = async () => {
      console.log("Heart on callback");
      const heartedProductId = Cookies.get("heartedProductId");
      const newHearted = !hearted;
      Cookies.remove("heartedProductId");

      // heartOnCallBack.current = true;
      if (hearted) {
        console.log("Hearted is true returning early");
        toast.info("Product is already hearted", {
          description: "Looks like this product is already hearted :)",
        });
        Cookies.remove("heartedProductId");
        return;
      }

      try {
        console.log("Hearted product id right in try", heartedProductId);
        console.log("Hearted product id right in try", hearted);
        console.log("type of hearted", typeof hearted);
        console.log("type of hearted product id", typeof heartedProductId);
        console.log("type of user id", typeof userId);
        console.log("userId", userId);
        console.log("Hearted opposite", !hearted);
        setHearted(newHearted);
        console.log("SHOULD BE NEW HEARTED TRUE", newHearted);
        console.log("right before handleHeartWrite");
        const result = await handleHeartWrite(
          userId as string,
          heartedProductId as string,
          newHearted
        );
        console.log("Right after handleHeartWrite");
        revalidateHeartedProducts();
        if (result.status === "SUCCESS") {
          console.log("Heart is successfull on callback should toast");
          toast.success("Success", {
            description: "Product has been hearted successfully",
          });
        } else {
          setHearted(!newHearted);
          revalidateHeartedProducts();
          toast.error("Error", {
            description:
              "Product was unable to be hearted. Please try again later",
          });
        }
      } catch (error) {
        setHearted(!newHearted);
        revalidateHeartedProducts();
        toast.error("Error", {
          description:
            "Product was unable to be hearted. Please try again later",
        });
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
  }, []);

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
      revalidateHeartedProducts();
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
        //router.refresh();
      } else {
        setHearted(!newHearted);
        toast.error("Error", {
          description:
            "Product has not able to be hearted. Please try again later",
        });
      }
    } catch (error) {
      revalidateHeartedProducts();
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
