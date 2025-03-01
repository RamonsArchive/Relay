import { z } from 'zod'

export const reviewSchmea = z.object({
    mainRating: z.number().int().min(1).max(5),
    recommend: z.boolean(),
    review: z.string().min(10).max(2000),
    reviewTitle: z.string().min(5).max(100),
    sizeRating: z.number().int().min(1).max(5),
    widthRating: z.number().int().min(1).max(5),
    comfortRating: z.number().int().min(1).max(5),
    qualityRating: z.number().int().min(1).max(5),
    valueRating: z.number().int().min(1).max(5),
    photo: z
    .object({
      _type: z.literal("image"), 
      _key: z.string(), 
      asset: z.object({
        _type: z.literal("reference"), 
        _ref: z.string(),
      }),
    })
    .optional()
    .nullable(),
})