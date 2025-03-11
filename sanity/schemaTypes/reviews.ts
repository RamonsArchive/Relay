import { defineField, defineType } from "sanity";

export const reviews = defineType({
  name: "reviews",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "mainRating",
      title: "Main Rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "wouldRecommend",
      title: "Would Recommend",
      type: "boolean",
    }),
    defineField({
      name: "review",
      title: "Review",
      type: "text",
    }),
    defineField({
      name: "reviewTitle",
      title: "Review Title",
      type: "string",
    }),
    defineField({
      name: "sizeRating",
      title: "Size Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "widthRating",
      title: "Width Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "comfortRating",
      title: "Comfort Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "qualityRating",
      title: "Quality Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "valueRating",
      title: "Value Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
    }),
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) =>
          `${doc.nickname}-${doc.reviewTitle}-${doc._id.slice(-4)}`,
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "slug.current",
    },
  },
});