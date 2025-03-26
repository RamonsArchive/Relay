"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";
import { CategoryType, ProductType, MaterialType } from "@/globalTypes";
import ProductHeart from "./ProductHeart";
import {User} from "next-auth";

const ProductCard = ({
  product,
  isHearted,
  callbackUrl,
  user,
}: {
  product: ProductType;
  isHearted: boolean;
  callbackUrl: string;
  user: User | undefined;
}) => {
  const { _id, title, mainImage, materials, categories, cost } = product;
  return (
    <li className="product-group w-full shrink-0 list-none">
      <div className="relative w-full flex-[3] overflow-hidden rounded-sm">
        <Link href={`/product/${_id}`}>
          <Image
            src={urlFor(mainImage).url()}
            alt="image"
            width={420}
            height={420}
            className="object-cover w-full h-full"
          />
        </Link>
        <div className="absolute top-2 right-2 cursor-pointer">
          <ProductHeart
            isHearted={isHearted}
            productId={_id}
            userId={user?.id || ""}
            callbackUrl={callbackUrl}
          />
        </div>
      </div>
      <Link href={`/product/${_id}`}>
        <div className="product-group-info flex-[2]">
          <span className="font-plex-sans font-bold text-[15px] xs:text-[16px] sm:[text-[17px] lg:text-[22px]">
            {title}
          </span>
          <span className="font-plex-sans font-light text-[12px] xs:text-[13px] sm:text-[14px] lg:text-[16px]">
            ${cost}
          </span>
          <div className="flex flex-wrap gap-x-1.5 font-plex-sans font-regular text-[13px] xs:text-[14px] sm:text-[15px] lg:text-[18px]">
            {materials &&
              materials.length > 0 &&
              materials.map((obj: MaterialType, index: number) => (
                <span key={index}>{obj.name}</span>
              ))}
          </div>
          <div className="flex flex-wrap gap-x-1.5 font-plex-sans font-regular text-[13px] xs:text-[14px] sm:text-[15px] lg:text-[18px]">
            {categories &&
              categories.length > 0 &&
              categories.map((obj: CategoryType, index: number) => (
                <span key={index}>{obj.name}</span>
              ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
