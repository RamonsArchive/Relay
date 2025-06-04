import { SanityDocument } from "sanity";
import { Product, Collections, internalGroqTypeReferenceTo, SanityImageHotspot, SanityImageCrop, Slug } from "./sanity.types";
import { Categories } from "./sanity/types";
import { JsonValue } from "type-fest";

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
    _id: string;
    _type: string;
    _rev: string;
    slug: {
        _type: string;
        current: string;
    };
    title: string;
    cost: number;
    description: string;
    mainImage: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
    imageGallery: Array<{
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    }>;
    categories: Array<{
        _ref: string;
        _type: string;
    }>;
    variants: Array<{
        _key: string;
        size: string;
        color: string;
        quantity: number;
    }>;
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

export type DatabaseVariantType = {
    id: string;
    productId: string;
    size: string;
    color: string;
    stockQuantity: number;
    sku: string | null;
    sanityRevisionId: string | null;
    lastSyncedAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CartType = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    tempCartId: string | null;
    expiresAt: Date | null;
    items: CartItemType[];
}

export type CartItemType = {
    id: number;
    cartId: number;
    variantId: string;
    quantity: number;
    addedAt: Date;
    updatedAt: Date;
}

export interface CartItemInfo {
  variantId:   number;       // Prisma’s Variant.id
  productId:   number;       // Prisma’s Product.id
  title:       string;       // product.title
  color:       string | null;
  size:        string | null;
  imageUrl:    string | null; 
  unitPrice:   number;       // variant.price (in cents, or dollars—whatever your schema uses)
  quantity:    number;       // how many units the customer is ordering
  lineSubtotal: number;      // calculated: unitPrice * quantity
}

/**
 * The overall cart “envelope” returned to the UI:
 */
export interface CartSummary {
  count:     number;            // total number of distinct variants in the cart (i.e. cart.items.length)
  total:     number;            // sum of all line subtotals
  items:     CartItemInfo[];    // one object for each cart‐item
}

export type BasketType = {
  productId: string | null;
  title: string | null;
  size: string;
  color: string | null;
  quantity: number;
  stockQuantity: number;
  price: number | null;
  images: JsonValue | null;
  lineSubtotal: number | null;
}