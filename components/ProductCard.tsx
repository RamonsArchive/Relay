"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";
import { ProductType } from "@/globalTypes";
import ProductHeart from "./ProductHeart";

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
  const { _id, title, mainImage, materials, categories } = product;
  return (
    <li className="product-group w-full list-none">
      <div className="relative w-full h-[300px] overflow-hidden">
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
            userId={user?.id}
            callbackUrl={callbackUrl}
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
