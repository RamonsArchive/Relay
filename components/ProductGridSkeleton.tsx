import React from 'react'
import {Skeleton}  from "@/components/ui/skeleton";


const ProductCardSkeleton = () => {
        return <Skeleton className="w-[200px] h-[250px] md:w-[300px] md:h-[350px] rounded-sm">
            <Skeleton className="w-[50px] h-[50px] rounded-sm"> </Skeleton>
            <Skeleton className="w-[50px] h-[50px] rounded-sm "></Skeleton>
        </Skeleton>
    
}
const ProductGridSkeleton = () => {
  const skeletons = Array.from({ length: 12 })
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 gap-5 mb-20">
        {skeletons.map((_, index) => (
            <div key={index}>{<ProductCardSkeleton/>}</div>
        ))}
    </div>
  )
}

export default ProductGridSkeleton