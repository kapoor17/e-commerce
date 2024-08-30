import { decimal, integer, pgTable } from "drizzle-orm/pg-core";
import { OrderSchema } from "./orders";
import { ProductSchema } from "./products";
import { BaseEntitySchema } from "./base";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const OrderItemSchema = pgTable('order_items', {
  ...BaseEntitySchema,
  orderId: integer('order_id').references(() => OrderSchema.id),
  productId: integer('product_id').references(() => ProductSchema.id),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export type OrderItemInsert = typeof OrderItemSchema.$inferInsert;
export const OrderItemInsertSchema = createInsertSchema(OrderItemSchema);
export type OrderItemSelect = typeof OrderItemSchema.$inferSelect;
export const OrderItemSelectSchema = createSelectSchema(OrderItemSchema);
