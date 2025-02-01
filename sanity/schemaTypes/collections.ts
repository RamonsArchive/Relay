import { defineField, defineType } from "sanity";

export const collections = defineType({
    name: "collections",
    title: "Collections",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Collection Name",
            type: "string",
            options: {
              list: ["New Arrivals", "Featured", "Hearted", "Sale", "Best Sellers"],
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
            title: 'name',
        }
    }
})