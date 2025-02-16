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
import { useAuth } from "@clerk/nextjs";

const ProductCard = ({
  product,
  isHearted,
  isAuth,
}: {
  product: ProductType;
  isHearted: boolean;
  isAuth: string;
}) => {
  const router = useRouter();
  const { _id, title, mainImage, materials, categories } = product;
  const [hearted, setHearted] = useState<boolean>(isHearted);

  useEffect(() => {
    setHearted(isHearted);
  }, [isHearted]);

  const toggleHeart = async () => {
    console.log("not yet passed auth check");
    if (!isAuth) {
      router.push("/sign-in");
      return;
    }
    console.log("passed auth check");
    try {
      const newHearted = !hearted;
      setHearted(newHearted);
      await handleHeartWrite(_id, newHearted as boolean);
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
          <div className="flex flex-row gap-x-1.5 font-plex-sans font-medium">
            {materials &&
              materials.length > 0 &&
              materials.map((material: string, index: number) => (
                <span key={index}>{material}</span>
              ))}
          </div>
          <div className="flex flex-row gap-x-1.5 font-plex-sans font-medium">
            {categories &&
              categories.length > 0 &&
              categories.map((category: string, index: number) => (
                <span key={index}>{category}</span>
              ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
