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
            validation: Rule => Rule.required().error("A user must have a user ID")
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
            validation: (Rule) =>
                Rule.regex(
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  { name: "email", invert: false }
                ).error("Invalid email format."),
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
            options: {list: ["google", "github", "email", "credentials", "undefined", "null"]},
            validation: (Rule) =>
                Rule.required().error("Provider must be one of the allowed values."),
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
        }),
        defineField({
            name: "frequentSearches",
            title: "Frequent Searches",
            type: "array",
            of: [{ type: "string" }]
          }),
          defineField({
            name: "popularCategories",
            title: "Popular Categories",
            type: "array",
            of: [{ type: "string" }]
          }),
        defineField({
            name: "recentSearches",
            title: "Recent Searches",
            type: "array",
            of: [{type: 'object', fields: [
                {name: 'query', type: 'string', title: 'Query'},
                {name: 'timestamp', type: 'number', title: 'Searched At'}
            ]}]
        })

    ],

    preview: {
        select: {
            title: 'email',
            subtitle: 'userId',
        }
    }

})