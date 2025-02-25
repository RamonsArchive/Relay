import { defineField, defineType } from "sanity";

export const categories = defineType({
  name: "categories", 
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      options: {
        list: [ 
          "accessories",
          "activewear",
          "bottoms",
          "dresses",
          "loungewear",
          "outerwear",
          "shoes",
          "swimwear",
          "tops",
          "underwear",
          "casual",
          "formal",
          "sportswear",
          "streetwear",
          "business casual",
          "luxury",
        ],
      },
      validation: (Rule) => Rule.required().error("Category name is required."),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", 
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
  ],

  preview: {
    select: {
      title: "name",
    },
  },
});