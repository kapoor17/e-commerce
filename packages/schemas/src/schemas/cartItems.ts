import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { CartSchema } from "./carts";
import { ProductSchema } from "./products";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const CartItemSchema = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id').references(() => CartSchema.id),
  productId: integer('product_id').references(() => ProductSchema.id),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type CartItemInsert = typeof CartItemSchema.$inferInsert;
export const CartItemInsertSchema = createInsertSchema(CartItemSchema);
export type CartItemSelect = typeof CartItemSchema.$inferSelect;
export const CartItemSelectSchema = createSelectSchema(CartItemSchema);
