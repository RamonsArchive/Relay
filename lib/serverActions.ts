"use server";
import { revalidateTag } from "next/cache";
import { signIn, signOut } from '@/auth';
import { redirect } from 'next/dist/server/api-utils';

export const handleSignIn = async (callbackUrl: string) => {
    return await signIn("google", {redirectTo: callbackUrl});
}

export const handleSignOut = async () => {
    return await signOut({redirectTo: "/"});
}

export const revalidateFlaggedReviews = async () => {
  console.log("Revalidating flagged reviews.........................");
  revalidateTag("flagged-reviews");
};

export const revalidateHeartedProducts = async () => {
  console.log("Revalidating hearted products.........................");
  revalidateTag("hearted-products");
}

export const revalidateRecentSearches = async () => {
  console.log("Revalidating recently searched.........................");
  revalidateTag("recent-searches");
}