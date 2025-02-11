import { SanityDocument } from "sanity";
import { Product, Collections, internalGroqTypeReferenceTo } from "./sanity.types";

export type ProductType = Pick<
  Product,
  "_id" 
> & {
    title: string | null;
    image: {
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
}