"use client";
import { BasketType } from "@/globalTypes";
import React, { Suspense } from "react";
import { urlFor } from "@/sanity/lib/client";
import BasketQuantitySelector from "./BasketQuantitySelector";
import Link from "next/link";
import BasketItemTrash from "./BasketItemTrash";

const BasketBlock = ({
  userId,
  item,
  cartId,
  temp_cartId,
}: {
  userId: string;
  item: BasketType;
  cartId: number;
  temp_cartId: string | null;
}) => {
  const {
    id,
    productId,
    title,
    color,
    size,
    images,
    price,
    stockQuantity,
    lineSubtotal,
    quantity,
  } = item;

  let mainImage = null;
  if (Array.isArray(images) && images.length > 0) {
    mainImage = urlFor(images[0] as string).url();
  } else {
    mainImage = "/placeholder.png";
  }

  return (
    <div
      className={`flex flex-row gap-y-2 w-full h-[200px] xs:h-[250px] gap-x-5 justify-start pt-5 border-b-[1px] bg-gray-50 border-gray-300 pb-5 pt-5 first:pt-3 last:border-b-0`}
    >
      <Link
        href={`/product/${productId}`}
        className="flex w-1/3 h-full min-w-[100px] max-w-[200px]"
      >
        <img
          src={mainImage}
          alt={"main image"}
          width={100}
          height={100}
          className="object-cover w-full h-full rounded-md"
        />
      </Link>

      <div className="flex flex-1 w-full h-full">
        <div className="flex flex-col w-full gap-y-3">
          <div className="flex flex-row gap-x-2 items-center justify-between">
            <Link
              href={`/product/${productId}`}
              className="font-plex-sans text-[18px] xs:text-[22px] md:text-[26px] font-bold"
            >
              {title}
            </Link>
            <BasketItemTrash userId={userId} variantId={id} cartId={cartId} />
          </div>
          <Link
            href={`/product/${productId}`}
            className="flex flex-col gap-y-2"
          >
            <div className="flex flex-row gap-x-2">
              <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] font-bold">
                Size:
              </p>
              <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] text-gray-500 font-bold">
                {size}
              </p>
            </div>
            <div className="flex flex-row gap-x-2">
              <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] font-bold">
                Color:
              </p>
              <p className="font-plex-sans text-[14px] xs:text-[16px] md:text-[18px] text-gray-600 font-bold">
                {color}
              </p>
            </div>
          </Link>
          <div className="flex flex-row gap-x-5 items-center">
            <p className="font-plex-sans text-[18px] xs:text-[20px] md:text-[22px] text-gray-500 font-bold">
              $
              {lineSubtotal
                ? (lineSubtotal / 100).toFixed(2)
                : ((price || 0) / 100).toFixed(2)}
            </p>
            <Suspense fallback={<div>Loading...</div>}>
              <BasketQuantitySelector
                variantId={id}
                productId={productId}
                quantity={quantity}
                stockQuantity={stockQuantity}
                userId={userId}
                temp_cartId={temp_cartId}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketBlock;
