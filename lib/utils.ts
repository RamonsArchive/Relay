import { ReviewType, VariantType, ReviewCount, ColorType, VariantItemType, TaxLineItemType, BasketType } from "@/globalTypes"
import { cart } from "@/sanity/schemaTypes/cart"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'Not available';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
}

export function getNumberOfReviews(amount: number) {
  return amount > 1 ? `${amount} reviews` : `${amount} review`
}

export function getReviewRating (reviews: ReviewType[]) {
  if (reviews?.length === 0) return 0;
  if (reviews.length === 1) return reviews[0]?.mainRating || 0;
  const total = reviews.reduce((sum: number, review: ReviewType) => sum + (review?.mainRating as number), 0);
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
  return reviews.reduce((acc: ReviewCount, review: ReviewType) => {
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

export const getUniqeColors = (variants: VariantType) => {
  if (!variants) return [];
  const uniqueMap: { [key: string]: ColorType } = {};
  variants.forEach((variant: VariantItemType) => {
    if (variant?.color && variant?.color?.name) {
      uniqueMap[variant.color.name.toLowerCase()] = variant.color;
    }
  });

  return Object.values(uniqueMap);
};

export const getSpecialFilters = (keywords: string[]) => {
  const defaultOrder = `order(_createdAt desc)`;

  const result = {
    order: defaultOrder,
    priceFilter: "",
    costRanges: [] as Array<[number, number]>,
  }

  const order = keywords.filter((keyword) => {
    const lower = keyword.toLowerCase();
    return ["newest", "oldest", "lowest priced", "highest priced"].some((word) => lower.includes(word));
  });
  const lastOrder = order[order.length - 1]?.toLowerCase() || "";
  if (lastOrder) {
    result.order = 
      lastOrder.includes("newest") ? `order(_createdAt desc)` :
      lastOrder.includes("oldest") ? `order(_createdAt asc)` :
      lastOrder.includes("lowest priced") ? `order(cost asc)` :
      lastOrder.includes("highest priced") ? `order(cost desc)` : defaultOrder;
  }


  const priceRangePattern = /\$?(\d+)(?:\s*-\s*\$?)(\d+)/;
  const ranges = keywords.map((keyword) => {
    const match = keyword.match(priceRangePattern);
    return match ? [parseInt(match[1]), parseInt(match[2])] : null
  }).filter(Boolean) as Array<[number, number]>;

  if (ranges.length > 0) {
    result.costRanges = ranges;
    result.priceFilter = ranges.map(([min, max]) => `cost >= ${min} && cost <= ${max}`).join(" || ");
  }

  return result; // saftey check
}


export const convertLineItemsForTax = (checkoutLineItems: BasketType[]) => {
  return checkoutLineItems.map((item) => ({
    amount: Math.round((item.price || 0) * item.quantity * 100), // Convert to cents
    tax_code: "txcd_99999999",
    tax_behavior: "exclusive",
    reference: `${item.productId}-${item.id}`,
    // Add tax_code if you have product tax codes
    // tax_code: item.tax_code || undefined,
  }));
};

export const convertLineItemsWithPriceData = (checkoutLineItems: BasketType[]) => {
  return checkoutLineItems.map((item: any) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.variant.product.title,
        description: `${item.variant.size} - ${item.variant.color}`,
        metadata: {
          productId: item.variant.product.id,
          variantId: item.variant.id,
        }
      },
      unit_amount: Math.round(item.variant.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));
};

export const fetchShippingOptions = async (cost: number) => {
// ===== SHIPPING OPTIONS =====
const getShippingOptions = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 0, currency: 'usd' }, // $0
      display_name: 'Free Shipping',
      id: 'free',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 7 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 999, currency: 'usd' }, // $9.99
      display_name: 'Standard Shipping',
      id: 'standard',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 7 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1299, currency: 'usd' }, // $0
      display_name: 'Express Shipping',
      id: 'express',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 2 },
        maximum: { unit: 'business_day', value: 5 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1999, currency: 'usd' }, // $19.99
      display_name: 'Overnight Shipping',
      id: 'overnight',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 2 },
      },
    },
  },
];

for (const option of getShippingOptions) {
  if (option.shipping_rate_data.fixed_amount.amount === cost) {
    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: option.shipping_rate_data,
    });
  }
}

return parseServerActionResponse({
  status: "ERROR",
  error: "Invalid shipping method",
});
}


export const stripeToShippingMethod = (cost: number) => {
  if (cost === 0) return "Free Shipping";
  if (cost === 999) return "Standard Shipping";
  if (cost === 1299) return "Express Shipping";
  if (cost === 1999) return "Overnight Shipping";
  return "Unknown Shipping Method";
}



