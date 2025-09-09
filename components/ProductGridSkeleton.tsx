import React from 'react'
import {Skeleton}  from "@/components/ui/skeleton";


const ProductCardSkeleton = () => {
        return <Skeleton className="w-[200px] h-[250px] md:w-[300px] md:h-[350px] gap-1 rounded-sm min-w-[150px] min-h-[200px] max-w-[350px] max-h-[450px]">
            <Skeleton className="relative w-full h-[60%] flex-[3] rounded-sm"> </Skeleton>
            <Skeleton className="product-group-info w-full h-[40%] flex-[2] rounded-sm"></Skeleton>
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