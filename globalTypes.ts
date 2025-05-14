import { SanityDocument } from "sanity";
import { Product, Collections, internalGroqTypeReferenceTo, SanityImageHotspot, SanityImageCrop, Slug } from "./sanity.types";
import { Categories } from "./sanity/types";

export type ProductType = Pick<
  Product,
  "_id" 
> & {
    title: string | null;
    mainImage: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
    } | null;
    categories: CategoryType[];
    materials: MaterialType[];
    hearted: boolean | null;
    collections: CollectionType[];
    cost: number
};

export type HeartCollectionType = Pick<Collections, "_id" & "title"> & {
  _id: string | null;
  _key: string | null;
  title: string | null;
};

export type ProductPageType = Pick<
Product,
"_id" 
> & {
  title: string | null;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  imageGallery?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    }
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  stock?: Array<{
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
    quantity?: number;
    _type: "stockItem";
    _key: string;
  }>;
  cost?: number;
  sale?: Array<string>;
  description: string | null;
  categories: Array<string> | null;
  materials: Array<string> | null;
  brand?: Array<string>;
  hearted: boolean | null;
  collections: Array<{_id: string, _key: string, title: string}> | null;
};


export type ReviewType = {
    _id?: string
    slug?: Slug;
    _createdAt?: string;
    _updatedAt?: string;
    user?: {
      _ref: string;
      _id?: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "user";
    };
    product?: {
      _ref: string;
      _id?: string
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "product";
    };
    mainRating?: number;
    wouldRecommend?: boolean;
    review?: string;
    reviewTitle?: string;
    sizeRating?: number;
    widthRating?: number;
    comfortRating?: number;
    qualityRating?: number;
    valueRating?: number;
    photo?: {
      asset?: {
        _ref?: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    nickname?: string;
    email?: string;
  };

  export type ColorType = {
    _id: string;
    _type: "colors";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: "black" | "white" | "gray" | "beige" | "navy" | "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "brown" | "olive" | "orange" | "teal" | "maroon";
    hexCode?: string;
    altNames?: Array<string>;
    slug?: Slug;
  };
  
  export type MaterialType = {
    _id: string;
    _type: "materials";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: "cotton" | "wool" | "linen" | "silk" | "cashmere" | "hemp" | "suede" | "leather" | "denim" | "polyester" | "nylon" | "spandex" | "rayon" | "fleece" | "acrylic" | "microfiber" | "gore-tex" | "neoprene" | "kevlar" | "coolmax" | "tencel (lyocell)" | "modal" | "organic cotton" | "recycled polyester" | "bamboo fabric" | "viscose";
    slug?: Slug;
  };

  export type CollectionType = {
    _id: string;
    _type: "collections";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: "new arrivals" | "featured" | "hearted" | "sale" | "best sellers";
    slug?: Slug;
  };

  export type FlaggedReviewType = {
    _id: string;
    review?: {
      _ref: string;
      _id: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "reviews";
    };
    flaggedBy?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "user";
    };
    flagReason?: "inappropriate" | "misleading" | "hateSpeech" | "harassment" | "violence" | "spam" | "other";
    createdAt?: string;
    moderationStatus?: "pending" | "reviewed" | "removed";
  }

  export type VariantType = Array<{
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
    color?: ColorType;
    quantity?: number;
    _type: "variant";
    _key: string;
  }>;

  export type VariantItemType = {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
    color?: ColorType;
    quantity?: number;
    _type: "variant";
    _key: string;
  }

  export type BrandType = {
    _id: string;
    _type: "brands";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: "nike" | "adidas" | "puma" | "reebok" | "new balance" | "under armour" | "converse" | "vans" | "jordan" | "fila" | "asics" | "columbia" | "patagonia" | "the north face" | "levi's" | "h&m" | "zara" | "uniqlo" | "gucci" | "louis vuitton";
    slug?: Slug;
    logo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  };

  export type CategoryType = {
    _id: string;
    _type: "categories";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: "accessories" | "activewear" | "bottoms" | "dresses" | "loungewear" | "outerwear" | "shoes" | "swimwear" | "tops" | "underwear" | "casual" | "formal" | "sportswear" | "streetwear" | "business casual" | "luxury";
    slug?: Slug;
  };

  export type SanityImage = {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
      _weak?: boolean;
    };
    hotspot?: {
      _type: "sanity.imageHotspot";
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      _type: "sanity.imageCrop";
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };


export type categoriesType = Pick<
  Categories,
  "_id"> & {
    name: string | null;
  };

export type ReviewStatsType = {
  normalizedSize: number;
  normalizedComfort: number;
  averageWouldRecommend: number;
  normalizedWidth: number;
  normalizedQuality: number;
  normalizedValue: number;
}

export type ProductStockType = Array<{
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
    quantity?: number;
    _type: "stockItem";
    _key: string;
  }>;


export type RecentSearches = Array<{
  query?: string;
  timestamp?: number;
  _key: string;
}>;

export type ReviewCount = {
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
}

export type ActionState = {
  status: "INITIAL" | "PENDING" | "SUCCESS" | "ERROR";
  error: string;
}


export type WebhookPayload = {
  _id: string
  _rev: string
  _type: string

  slug: string
  title: string
  cost: number
  description: string

  mainImage: string
  imageGallery: string[]

  categories: string[]

  variants: Array<{
    _key: string
    size: string
    color: string
    quantity: number
  }>
}

export type SanitySyncResult = {
    success: boolean;
    error?: string;
    syncId: number;
    productId?: string;
    variantIds?: string[];
}


export type PayloadVariantType = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  color?: string;
  quantity?: number;
  _type: "variant";
  _key: string;
}
