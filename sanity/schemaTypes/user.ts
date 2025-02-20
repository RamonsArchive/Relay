import { defineField, defineType } from "sanity";

export const user = defineType({
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'string',
        }),
        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',
        }),
        defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        }),
        defineField({
            name: "provider",
            title: "Provider",
            type: "string",
            options: {list: ["google", "github", "email", "credentials", "undefined", "null"]}
        }),
        defineField({
            name: "heartedProducts",
            title: "Hearted Products",
            type: "array",
            of: [{type: 'reference', to: [{type: 'product'}]}]
        }),
        defineField({
            name: "userReviews",
            title: "User Reviews",
            type: "array",
            of: [{type: 'reference', to: [{type: 'reviews'}]}]
        }),
        defineField({
            name: "recentlyViewedProducts",
            title : "Recently Viewed Products",
            type: "array",
            of: [{type: 'reference', to: [{type: 'product'}]}]
        })
    ],

    preview: {
        select: {
            title: 'email',
            subtitle: 'userId',
        }
    }

})