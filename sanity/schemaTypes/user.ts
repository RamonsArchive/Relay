import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const user = defineType({
    name: "user",
    title: "User",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: 'firstName',
            type: 'string',
        }),
        defineField({
            name: 'id',
            type: 'number',
        }),
        defineField({
            name: 'lastName',
            type: 'string',
        }),
        defineField({
            name: 'email',
            type: 'string',
        }),
    ],

    preview: {
        select: {
            title: 'firstName',
        }
    }

})