import { title } from "process";
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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
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
            }
        }),
        defineField({
            name: 'kids',
            title: 'Kids',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: ['boys', 'girls'],
                layout: 'tags',
            }
        }),
        defineField({
            name: 'size',
            title: 'Sizes',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
                layout: 'tags',
            }
        }),
        defineField({
            name: 'cost',
            title: 'Cost',
            type: 'number',
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'array',
            of: [{
                name: 'stockItem',
                title: 'Stock Item',
                type: 'object',
                fields: [
                  {
                    name: "size",
                    title: "Size",
                    type: 'string',
                    options: {
                        list: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
                        layout: 'tags',
                    }
                  },
                  {
                    name: "quantity",
                    title: "Quantity",
                    type: 'number',
                    validation: (Rule) => Rule.min(0)
                  }
                ],
            }, 
        ],
        }),
        defineField({
            name: 'sale',
            title: 'Sale',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: ['sale'],
                layout: 'tags',
            }
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
            of: [{type: 'string'}],
            options: {
                list: [  "Black",
                    "White",
                    "Gray",
                    "Beige",
                    "Navy",
                    "Red",
                    "Blue",
                    "Green",
                    "Yellow",
                    "Purple",
                    "Pink",
                    "Brown",
                    "Olive",
                    "Orange",
                    "Teal",
                    "Maroon",],
                layout: 'tags',
            }
        }),
        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: ["Nike",
                    "Adidas",
                    "Puma",
                    "Reebok",
                    "New Balance",
                    "Under Armour",
                    "Converse",
                    "Vans",
                    "Jordan",
                    "Fila",
                    "ASICS",
                    "Columbia",
                    "Patagonia",
                    "The North Face",
                    "Levi's",
                    "H&M",
                    "Zara",
                    "Uniqlo",
                    "Gucci",
                    "Louis Vuitton",    
                ],  
                layout: 'tags',
            }
        }),
        defineField({
            name: 'materials',
            title: 'Materials',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [  "Cotton", 
                    "Wool", 
                    "Linen", 
                    "Silk", 
                    "Cashmere", 
                    "Hemp", 
                    "Suede", 
                    "Leather", 
                    "Denim", 
                    "Polyester", 
                    "Nylon", 
                    "Spandex", 
                    "Rayon", 
                    "Fleece", 
                    "Acrylic", 
                    "Microfiber", 
                    "Gore-Tex", 
                    "Neoprene", 
                    "Kevlar", 
                    "Coolmax", 
                    "Tencel (Lyocell)", 
                    "Modal", 
                    "Organic Cotton", 
                    "Recycled Polyester", 
                    "Bamboo Fabric", 
                    "Viscose",],
                layout: 'tags',
            }
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [ "Casual",
                    "Formal",
                    "Sportswear",
                    "Loungewear",
                    "Streetwear",
                    "Business Casual",
                    "Outerwear",
                    "Footwear",
                    "Accessories",
                    "Activewear",
                    "Swimwear",
                    "Undergarments",
                    "Luxury",],
                layout: 'tags',
            }
        }),
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
})