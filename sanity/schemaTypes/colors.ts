import { defineField, defineType } from "sanity";

export const colors = defineType({
  name: "colors", 
  title: "Color",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Color Name",
      type: "string",
      options: {
        list: [
          "black",
          "white",
          "gray",
          "beige",
          "navy",
          "red",
          "blue",
          "green",
          "yellow",
          "purple",
          "pink",
          "brown",
          "olive",
          "orange",
          "teal",
          "maroon",
        ],
      },
      validation: (Rule) => Rule.required().error("Color name is required."),
    }),
    defineField({
      name: "hexCode",
      title: "Hex Code",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-F]{3}){1,2}$/i, {
          name: "hex color",
          invert: false,
        }).error("Must be a valid hex color code (e.g., #FFFFFF)."),
    }),

    defineField({
      name: "altNames",
      title: "Alternative Names",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
          source: "name",
          maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name", 
    },
  },
});