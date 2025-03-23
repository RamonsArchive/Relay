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
    categories: Array<string> | null;
    materials: Array<string> | null;
    hearted: boolean | null;
    collections: Array<{_id: string, _key: string, title: string}> | null;
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