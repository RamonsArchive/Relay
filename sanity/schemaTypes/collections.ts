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
            validation: (Rule) =>
              Rule.required().custom((title) => {
                const validTitles = ["new arrivals", "featured", "hearted", "sale", "best sellers"];
          
                if (!title) {
                  return "Collection title is required.";
                }
          
                if (!validTitles.includes(title)) {
                  return `Invalid collection title. Allowed values: ${validTitles.join(", ")}`;
                }
          
                return true; 
              }),
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