"use client";
import React from "react";
import { useState } from "react";
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
    <div className="hidden md:flex flex-row gap-5 w-full pl-[10%]">
      <div className="min-w-[75px] p-2 align-center">
        <ul className="flex flex-col items-center gap-2 lg:gap-4 relative">
          <li
            className="h-[50px] lg:h-[75px]"
            onMouseEnter={() => setFrontImage(imageMain)}
          >
            <Image
              src={urlFor(constantMainImage).url()}
              alt="product image"
              width={75}
              height={75}
              className="object-contain w-full h-full"
            />
          </li>
          {galleryImages?.map((image, key) => (
            <li
              key={key}
              className="h-[50px] lg:h-[75px]"
              onMouseEnter={() => setFrontImage(image)}
            >
              <Image
                src={urlFor(image).url()}
                alt="product image"
                width={75}
                height={75}
                className="object-contain w-full h-full"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-w-[300px] w-full h-[650px] lg:h-[700px] overflow-hidden">
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
