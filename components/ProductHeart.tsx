"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
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
    const setHeart = async () => {
      console.log("Heart on callback");
      const heartedProductId = Cookies.get("heartedProductId");
      const newHearted = !hearted;
      Cookies.remove("heartedProductId");

      if (hearted) {
        console.log("Hearted is true returning early");
        toast.info("Product is already hearted", {
          description: "Looks like this product is already hearted :)",
        });
        return;
      }

      if (!userId) {
        console.log("User id is not present, returning early");
        return;
      }

      try {
        console.log("Hearted product id right in try", heartedProductId);
        console.log("Hearted status:", hearted);
        console.log("Type of hearted:", typeof hearted);
        console.log("Type of heartedProductId:", typeof heartedProductId);
        console.log("Type of userId:", typeof userId);
        console.log("UserId:", userId);
        console.log("Hearted opposite:", !hearted);

        setHearted(newHearted);
        console.log("SHOULD BE NEW HEARTED TRUE", newHearted);

        console.log("Right before handleHeartWrite");
        const result = await handleHeartWrite(
          userId as string,
          heartedProductId as string,
          newHearted
        );
        console.log("Right after handleHeartWrite");

        revalidateHeartedProducts();

        if (result.status === "SUCCESS") {
          console.log("Heart is successful on callback, should toast");
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
        return result;
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
