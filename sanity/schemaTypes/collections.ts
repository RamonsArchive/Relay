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
              list: ["new arrivals", "featured", "hearted", "sale", "best sellers"],
            },
          }),
          defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
              source: "name", // Generates from the product title
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