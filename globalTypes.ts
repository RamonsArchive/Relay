import { SanityDocument } from "sanity";
import { Product, Collections, Reviews, internalGroqTypeReferenceTo, SanityImageHotspot, SanityImageCrop } from "./sanity.types";
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


export type ReviewType = Pick<
  Reviews,
  "_id"> & {
    _createdAt: string;
    rating: number | null;
    wouldRecommend: boolean | null;
    review: string | null;
    reviewTitle: string | null;
    sizeRating: number | null;
    widthRating: number | null;
    comfortRating: number | null;
    qualityRating: number | null;
    valueRating: number | null;
    photo: string | null;
    nickname: string | null;
    slug: string | null;
    email: string | null;
  };


export type categoriesType = Pick<
  Categories,
  "_id"> & {
    name: string | null;
  };
