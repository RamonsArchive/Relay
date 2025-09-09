"use client";
import React from 'react'
import {User}  from "next-auth";
import dynamic from 'next/dynamic';

const ReviewForm = dynamic(() => import("@/components/ReviewForm"), {ssr: false});

const ReviewFormWrapper = ({user, productId}: {user: User, productId: string}) => {
  return (
    <ReviewForm productId={productId} user={user} />
  )
}

export default ReviewFormWrapper