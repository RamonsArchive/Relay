import { defineField, defineType } from "sanity";

export const brands = defineType({
  name: "brands", 
  title: "Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
      type: "string",
      options: {
        list: [
          "nike",
          "adidas",
          "puma",
          "reebok",
          "new balance",
          "under armour",
          "converse",
          "vans",
          "jordan",
          "fila",
          "asics",
          "columbia",
          "patagonia",
          "the north face",
          "levi's",
          "h&m",
          "zara",
          "uniqlo",
          "gucci",
          "louis vuitton",
        ],
      },
      validation: (Rule) => Rule.required().error("Brand name is required."),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // ✅ Auto-generates slug from brand name
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),

    defineField({
      name: "logo",
      title: "Brand Logo",
      type: "image",
      options: { hotspot: true }, 
      validation: (Rule) => Rule.required().error("Brand logo is required."),
    }),
  ],
  preview: {
    select: {
        title: 'name',
    }
}
});