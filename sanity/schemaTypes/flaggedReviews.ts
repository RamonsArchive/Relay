import { defineType, defineField } from "@sanity/types";

export const flaggedReviews = defineType({ 
    name: "flaggedReviews",
    title: "Flagged Reviews",
    type: "document",
    fields: [
        defineField({
            name: "review",
            title: "Review",
            type: "reference",
            to: [{ type: "reviews" }]
        }),

        defineField({
            name: "flaggedBy",
            title: "Flagged By",
            type: "reference",
            to: [{ type: "user" }]
        }),
        defineField({
            name: "flagReason",
            title: "Flag Reason",
            type: "string",
            options: {
                list: [
                    { title: "Inappropriate", value: "inappropriate" },
                    { title: "Misleading", value: "misleading" },
                    { title: "Hate Speech", value: "hatespeech" },
                    { title: "Harassment", value: "harassment" },
                    { title: "Violence", value: "violence" },
                    { title: "Spam", value: "spam" },
                    { title: "Other", value: "other" }
                ]
            }
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "moderationStatus",
            title: "Moderation Status",
            type: "string",
            options: {
              list: [
                { title: "Pending", value: "pending" },
                { title: "Reviewed", value: "reviewed" },
                { title: "Removed", value: "removed" },
              ],
            },
          }),


    ]
})
