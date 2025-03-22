"use client";
import React from "react";
import { useState } from "react";
import { ProductPageType } from "@/globalTypes";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import { SanityImage } from "@/globalTypes";

const ProductImages = ({
  imageMain,
  galleryImages,
}: {
  imageMain: SanityImage;
  galleryImages: SanityImage[];
}) => {
  const constantMainImage = imageMain;

  const [frontImage, setFrontImage] = useState(imageMain);
  return (
    <div className="hidden sm:flex flex-row gap-5 w-full ">
      <div className="min-w-[100px] p-2 align-center">
        <ul className="flex flex-col items-center gap-4 relative">
          <li
            className="h-[50px]"
            onMouseEnter={() => setFrontImage(imageMain)}
          >
            <Image
              src={urlFor(constantMainImage).url()}
              alt="product image"
              width={75}
              height={75}
              className="object-cover w-full h-full overflow-y-auto"
            />
          </li>
          {galleryImages?.map((image, key) => (
            <li
              key={key}
              className="h-[50px]"
              onMouseEnter={() => setFrontImage(image)}
            >
              <Image
                src={urlFor(image).url()}
                alt="product image"
                width={75}
                height={75}
                className="object-contain w-full h-full overflow-y-auto"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-w-[350px] w-full h-[650px] overflow-hidden">
        <Image
          src={urlFor(frontImage).url()}
          alt="main image"
          width={400}
          height={400}
          className="object-contain w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ProductImages;
