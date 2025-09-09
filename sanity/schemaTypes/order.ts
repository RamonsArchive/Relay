import { defineField, defineType } from "sanity";

/* TODO: Move to MySQL for more reliable and faster backend */
export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          title: "Ordered Item",
          fields: [
            { name: "product", title: "Product", type: "reference", to: [{ type: "product" }] },
            { name: "size", title: "Size", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "total",
      title: "Total Price",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["processing", "shipped", "out for delivery", "delivered", "cancelled"],
      },
    }),
    defineField({
      name: "trackingNumber",
      title: "Tracking Number",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Shipping Address",
      type: "string",
    }),
    defineField({
      name: "placedAt",
      title: "Placed At",
      type: "datetime",
    }),
  ],
});