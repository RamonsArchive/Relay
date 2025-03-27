import React from 'react'
import { Skeleton } from './ui/skeleton'


export const SideBarCardSkeleton = () => {
   return <Skeleton className="w-[125px] h-[50px]">
    </Skeleton>
    
}
const SideBarSkeleton = () => {
  const skeletons = Array.from({length: 12})
  return (
    <div className="hidden sm:flex flex-col w-full h-full pb-20 gap-5 items-center pt-[4rem] md:pt-[0] scrollbar-hidden">
        {skeletons.map((_, index) => (
            <div key={index}>{<SideBarCardSkeleton/>}</div>
        ))}
    </div>
  )
}

export default SideBarSkeleton