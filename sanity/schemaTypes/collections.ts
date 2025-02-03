import { defineField, defineType } from "sanity";

export const collections = defineType({
    name: "collections",
    title: "Collections",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Collection Title",
            type: "string",
            options: {
              list: ["newarrivals", "featured", "hearted", "sale", "bestsellers"],
            },
          }),
          defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
              source: "title", // Generates from the product title
              maxLength: 96,
            },
          }),
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
})