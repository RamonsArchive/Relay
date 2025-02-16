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
            name: "heartedProducts",
            title: "Hearted Products",
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