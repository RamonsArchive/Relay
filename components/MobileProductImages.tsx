"use client";
import React from "react";
import { useState } from "react";
import { SanityImage } from "@/globalTypes";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";

const MobileProductImages = ({
  imageMain,
  galleryImages,
}: {
  imageMain: SanityImage;
  galleryImages: SanityImage[];
}) => {
  const mobileImages = [imageMain, ...(galleryImages || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && currentIndex < mobileImages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (distance < -minSwipeDistance && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full md:hidden">
      <div
        className="relative w-full aspect-square h-auto max-h-[300px] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={urlFor(mobileImages[currentIndex]).url()}
          alt={`Product image ${currentIndex}`}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center mt-2">
          {mobileImages.map((_key, index) => (
            <div
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${index == currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileProductImages;
