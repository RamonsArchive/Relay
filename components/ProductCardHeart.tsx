"use client";
import React from 'react'
import { Heart } from "lucide-react";

const ProductCardHeart = ({handleHeartWrite, hearted}: {handleHeartWrite: () => void; hearted?: boolean}) => {
  return (
    <div className="absolute top-2 right-2 cursor-pointer" onClick={ () => handleHeartWrite}>
          <Heart size={24} className={hearted ? "text-red-500" : "text-gray-400"}/>
    </div>
  )
}

export default ProductCardHeart