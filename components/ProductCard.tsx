"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";
import { ProductType } from "@/globalTypes";
import { useState, useEffect } from "react";
import { handleHeartWrite } from "@/sanity/lib/actions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProductCard = ({
  product,
  isHearted,
  callbackUrl,
  user,
}: {
  product: ProductType;
  isHearted: boolean;
  callbackUrl: string;
  user: any;
}) => {
  const router = useRouter();
  const { _id, title, mainImage, materials, categories } = product;
  const [hearted, setHearted] = useState<boolean>(isHearted);
  console.log("Materials", materials);
  console.log("Categories", categories);

  useEffect(() => {
    setHearted(isHearted);
  }, [isHearted]);

  const toggleHeart = async () => {
    console.log("not yet passed auth check");
    if (!user) {
      Cookies.set("heartedProductId", _id, { expires: 1 });
      Cookies.set("heartedAction", "true", { expires: 1 });
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    console.log("passed auth check");
    try {
      const newHearted = !hearted;
      setHearted(newHearted);
      console.log("Going to handleHeartWrite");
      await handleHeartWrite(_id, newHearted as boolean);
      console.log("Hearted action executed");
      router.refresh();
    } catch (error) {
      console.error("Failed to execute hearted action:", error);
    }
  };
  return (
    <li className="product-group w-full">
      <div className="relative w-full h-[250px] overflow-hidden">
        <Link href={`/product/${_id}`}>
          <Image
            src={urlFor(mainImage).url()}
            alt="image"
            width={420}
            height={420}
            className="object-cover w-full h-full"
          />
        </Link>
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={toggleHeart}
        >
          <Heart
            size={24}
            className={hearted ? "text-primary-200" : "text-black"}
            fill={hearted ? "#004BFE" : "none"}
          />
        </div>
      </div>
      <Link href={`/product/${_id}`}>
        <div className="product-group-info">
          <span className="font-plex-sans font-bold text-[20px]">{title}</span>
          <div className="flex flex-wrap gap-x-1.5 font-plex-sans font-medium">
            {materials &&
              materials.length > 0 &&
              materials.map((obj: any, index: number) => (
                <span key={index}>{obj.name}</span>
              ))}
          </div>
          <div className="flex flex-wrap gap-x-1.5 font-plex-sans font-medium">
            {categories &&
              categories.length > 0 &&
              categories.map((obj: any, index: number) => (
                <span key={index}>{obj.name}</span>
              ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
