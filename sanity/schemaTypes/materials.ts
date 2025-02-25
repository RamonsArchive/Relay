import { defineField, defineType } from "sanity";

export const materials = defineType({
  name: "materials", 
  title: "Material",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Material Name",
      type: "string",
      options: {
        list: [  
          "cotton", 
          "wool", 
          "linen", 
          "silk", 
          "cashmere", 
          "hemp", 
          "suede", 
          "leather", 
          "denim", 
          "polyester", 
          "nylon", 
          "spandex", 
          "rayon", 
          "fleece", 
          "acrylic", 
          "microfiber", 
          "gore-tex", 
          "neoprene", 
          "kevlar", 
          "coolmax", 
          "tencel (lyocell)", 
          "modal", 
          "organic cotton", 
          "recycled polyester", 
          "bamboo fabric", 
          "viscose",
        ],
      },
      validation: (Rule) => Rule.required().error("Material name is required."),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // ✅ Auto-generates slug from material name
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
  ],
  preview: {
    select: {
        title: 'name',
    }
  }
});