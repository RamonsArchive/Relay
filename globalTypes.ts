import { SanityDocument } from "sanity";
import { Product, internalGroqTypeReferenceTo } from "./sanity.types";

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
    collections: Array<{_id: string, title: string}> | null;
};