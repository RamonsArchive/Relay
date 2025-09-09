
import { defineField, defineType } from "sanity";

/* TODO: Move to MySQL for faster and more reliable and professional backend */
export const cart = defineType({
    name: "cart",
    title: "Cart",
    type: "document",
    fields: [
        defineField({
            name: "user",
            title: "User",
            type: "reference",
            to: [{type: "user"}],
        }),
        defineField({
            name: "items",
            title: "Cart Items",
            type: "array",
            of: [
            {
                type: "object",
                title: "Cart Item",
                fields: [
                    defineField({
                        name: "product",
                        title: "Product",
                        type: "reference",
                        to: [{type: "product"}],
                    }),
                    defineField({
                        name: "size",
                        title: "Size",
                        type: "string",
                        options: {
                            list: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
                        }
                    }),
                    defineField({
                        name: "quantity",
                        title: "Quantity",  
                        type: "number",
                        validation: (Rule) => Rule.min(0)
                    })
                ]

            }
        ]
    }),
    defineField({
        name: "status",
        title: "Status",
        type: "string",
        options: {
            list: ["active", "completed", "cancelled"],
        }
    })
    ]
})