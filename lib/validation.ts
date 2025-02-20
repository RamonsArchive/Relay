import { z } from 'zod'

export const reviewSchmea = z.object({
    mainRating: z.number().int().min(1).max(5),
    recommend: z.number().int().min(0).max(1),
    review: z.string().min(10).max(2000),
    reviewTitle: z.string().min(5).max(100),
    sizeRating: z.number().int().min(1).max(5),
    widthRating: z.number().int().min(1).max(5),
    comfortRating: z.number().int().min(1).max(5),
    qualityRating: z.number().int().min(1).max(5),
    valueRating: z.number().int().min(1).max(5),
    photo: z.instanceof(File).optional().nullable().refine((file) => {
            if (!file || file.name == "" || file.size == 0) return true;
            return file.size <= 5 * 1024 * 1024
            }, "File must be less than 5MB")
        .refine((file) => {
            if (!file || file.name == "" || file.size == 0) return true;
            return ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        }, "File must be a jpeg, png or webp"),
    email: z.string().email()
})