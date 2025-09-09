import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            }
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'imageGallery',
            title: 'Image Gallery',
            type: 'array',
            of: [
                {
                    type: 'image', 
                    options: {hotspot: true},
                }
            ],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'markdown',
        }),
        defineField({
            name: 'gender',
            title: 'Gender',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: ['men', 'women', 'unisex'],
                layout: 'tags',
            },
            validation: (Rule) =>
                Rule.custom((genders) => {
                  const allowedGenders = ['men', 'women', 'unisex'];
                  if (!genders) return true; // Skip validation if empty
            
                  for (const gender of genders) {
                    if (!allowedGenders.includes(gender as string)) {
                      return `"${gender}" is not a valid gender. Allowed values: ${allowedGenders.join(', ')}`;
                    }
                  }
                  return true;
                }),
        }),
        defineField({
            name: 'kids',
            title: 'Kids',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: ['boys', 'girls'],
                layout: 'tags',
            },
            validation: (Rule) => 
                Rule.custom((kids) => {
                    const allowedKids = [
                        "boys",
                        "girls",
                    ];
                    if (!kids) return true; // Skip validation if no kids are provided
                    for (const kid of kids) {
                        if (!allowedKids.includes(kid as string)) {
                            return `"${kid}" is not a valid kid. Allowed kids are: ${allowedKids.join(', ')}`;
                        }
                    }
                    return true;
                })
        }),
        defineField({
            name: 'cost',
            title: 'Cost',
            type: 'number',
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'object',
            fields: [
                {   
                    name: 'mainDetails',
                    title: "Main text",
                    type: 'array',
                    of: [{type: 'block'}]
                },
                {
                    name: 'detailBullets',
                    title: 'Detail Bullets',
                    type: 'array',
                    of: [{type: 'string'}],
                }
            ]
        }),
        
        defineField({
            name: 'productReviews',
            title: 'Product Reviews',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'reviews'}]}],
        }),
        defineField({
            name: "variants",
            title: "Variants",
            type: "array",
            of: [
              {
                name: "variant",
                title: "Variant",
                type: "object",
                fields: [
                  defineField({
                    name: "size",
                    title: "Size",
                    type: "string",
                    options: {
                      list: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
                      layout: "dropdown",
                    },
                    validation: (Rule) =>
                      Rule.required().custom((size) => {
                        const allowedSizes = [
                          "xs",
                          "s",
                          "m",
                          "l",
                          "xl",
                          "xxl",
                          "xxxl",
                        ];
                        if (!allowedSizes.includes(size as string)) {
                          return `"${size}" is not a valid size. Allowed sizes: ${allowedSizes.join(
                            ", "
                          )}`;
                        }
                        return true;
                      }),
                  }),
                  defineField({
                    name: "color",
                    title: "Color",
                    type: "reference",
                    to: [{ type: "colors" }],
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    name: "quantity",
                    title: "Quantity",
                    type: "number",
                    validation: (Rule) =>
                      Rule.required()
                        .min(0)
                        .integer()
                        .error("Quantity must be a whole number and at least 0"),
                  }),
                ],
              },
            ],
            validation: (Rule) =>
              Rule.custom((variants) => {
                if (!Array.isArray(variants)) return "Variants must be an array.";
                const seenVariants = new Set();
                for (const variant of variants as any) {
                  if (!variant.size || !variant.color || variant.quantity < 0) {
                    return "Each variant must have a size, a color, and a quantity.";
                  }
                  // Create a unique key for the combination of size and color.
                  const key = `${variant.size}-${variant.color._ref}`;
                  if (seenVariants.has(key)) {
                    return `Duplicate variant detected: ${key}. Each variant should be unique.`;
                  }
                  seenVariants.add(key);
                }
                return true;
              }),
          }),
        defineField({
            name: 'collections',
            title: 'Collections',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'collections'}]}],
        }),
        defineField({
            name: 'colors',
            title: 'Colors',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'colors'}]}],
        }),
        defineField({
            name: 'brands',
            title: 'Brand',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'brands'}]}],
        }),
        defineField({
            name: 'materials',
            title: 'Materials',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'materials'}]}]
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'categories'}]}],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
})