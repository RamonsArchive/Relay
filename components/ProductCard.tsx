import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

const ProductCard = ({ product }: { product: any }) => {
  const { _id, title, image, categories, materials } = product;
  console.log(image);
  return (
    <li className="product-group">
      <div className="relative">
        <Link href={`/product/${_id}`}>
          <Image
            src={urlFor(image).url()}
            alt="image"
            width={420}
            height={360}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <Heart size={24} />
        </div>
      </div>
      <Link href={`/product/${_id}`}>
        <div className="product-group-info">
          <span className="font-plex-sans font-bold text-[20px]">{title}</span>
          <div className="flex flex-row gap-x-1.5 font-plex-sans font-medium">
            {materials.length > 0 &&
              materials.map((material: string, index: number) => (
                <span key={index}>{material}</span>
              ))}
          </div>
          <div className="flex flex-row gap-x-1.5 font-plex-sans font-medium">
            {categories.length > 0 &&
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
