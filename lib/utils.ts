import { ReviewType } from "@/globalTypes"
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
  if (reviews?.length === 0) return 0;
  if (reviews.length === 1) return reviews[0]?.mainRating || 0;
  const total = reviews.reduce((sum: number, review: any) => sum + review.mainRating, 0);
  return (total / reviews.length);
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export function readFileAsDataURL (file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result); 
      } else {
        reject(new Error("Failed to read file as data URL"));
      }
    }
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    }
    reader.readAsDataURL(file);
  })
}


export const sanitizeSanityId = (id: string): string | null => {
  if (typeof id !== "string") {
    console.error("Invalid ID type:", id);
    return null;
  }
  const trimmedId = id.trim();
  if (/^[a-zA-Z0-9\-_]{16,40}$/.test(trimmedId)) {
    console.log("Trimmed id", trimmedId);
    return trimmedId;
  }

  return null;
};

export const sanitizeSearchQuery = (query: string): string | null => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return null;
  }
  
  const maxLength = 100;
  if (trimmedQuery.length > maxLength) {
    return null;
  }

  const escapedQuery = trimmedQuery.replace(/[<>"'&]/g, ""); 
  return escapedQuery;
};

export const ReviewSliderStats = (reviews: ReviewType[]) => {
  const totalReviews = reviews.length || 1;
  const averageSize =
    reviews.reduce((sum, r) => sum + (r.sizeRating || 2), 0) / totalReviews;
  console.log("true average size", averageSize);
  const averageComfort =
    reviews.reduce((sum, r) => sum + (r.comfortRating || 2), 0) / totalReviews;
  const averageWouldRecommend =
    reviews.reduce((sum, r) => sum + (r.wouldRecommend === true ? 1 : 0), 0) /
    totalReviews;
  const averageWidth =
    reviews.reduce((sum, r) => sum + (r.widthRating || 2), 0) / totalReviews;
  const averageQuality =
    reviews.reduce((sum, r) => sum + (r.qualityRating || 2), 0) / totalReviews;
  const averageValue =
    reviews.reduce((sum, r) => sum + (r.valueRating || 2), 0) / totalReviews;

  const normalizeRating = (rating: number) => (rating - 1) / 2;

  const normalizedSize = normalizeRating(averageSize);
  const normalizedComfort = normalizeRating(averageComfort);
  const normalizedWidth = normalizeRating(averageWidth);
  const normalizedQuality = normalizeRating(averageQuality);
  const normalizedValue = normalizeRating(averageValue);

  console.log("Average size", averageSize);
  console.log("normalized size", normalizedSize);
  console.log("Average Comfort", averageComfort);
  console.log("normalized comfort", normalizedComfort);
  console.log("average would reccomend", averageWouldRecommend);
  return {
    normalizedSize: normalizeRating(averageSize),
    normalizedComfort: normalizeRating(averageComfort),
    averageWouldRecommend: averageWouldRecommend,
    normalizedWidth: normalizeRating(averageWidth),
    normalizedQuality: normalizeRating(averageQuality),
    normalizedValue: normalizeRating(averageValue),
    
  }
}
