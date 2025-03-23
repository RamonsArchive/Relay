import { ReviewType, VariantType } from "@/globalTypes"
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

  return {
    normalizedSize: normalizeRating(averageSize),
    normalizedComfort: normalizeRating(averageComfort),
    averageWouldRecommend: averageWouldRecommend,
    normalizedWidth: normalizeRating(averageWidth),
    normalizedQuality: normalizeRating(averageQuality),
    normalizedValue: normalizeRating(averageValue),
  }
}


export const getNumReviewsPerStar = (reviews: ReviewType[]) => {
  if (!reviews) {
    return {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0
    }
  }
  return reviews.reduce((acc: any, review: ReviewType) => {
    const rating = review.mainRating;
    if (rating === 1) acc.oneStar++;
    if (rating === 2) acc.twoStar++;
    if (rating === 3) acc.threeStar++;
    if (rating === 4) acc.fourStar++;
    if (rating === 5) acc.fiveStar++;
    return acc;
  }, {
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0
  })
}

export const handleUpdateReviews = (type: string) => {
  const newReviews = null;
  //if (type === "")
}


export const getUniqeColors = (variants: VariantType) => {
  if (!variants) return [];
  const uniqueMap: { [key: string]: any } = {};
  variants.forEach((variant: any) => {
    if (variant?.color && variant?.color?.name) {
      uniqueMap[variant.color.name.toLowerCase()] = variant.color;
    }
  });

  return Object.values(uniqueMap);
};
