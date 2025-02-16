import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getNumberOfReviews(amount: number) {
  return amount > 1 ? `${amount} reviews` : `${amount} review`
}

export function getReviewRating (reviews: any) {
  if (!reviews.length) return 0;
  if (reviews.length === 1) return reviews[0]?.rating || 0;
  const total = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
  return (total / reviews.length);
}

