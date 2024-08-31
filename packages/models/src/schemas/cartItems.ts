import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { CartSchema } from './carts';
import { ProductSchema } from './products';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { uuid } from 'drizzle-orm/pg-core';
import { BaseEntitySchema } from './base';

export const CartItemSchema = pgTable('cart_items', {
  ...BaseEntitySchema,
  cartId: uuid('cartId').references(() => CartSchema.id),
  productId: uuid('productId').references(() => ProductSchema.id),
  quantity: integer('quantity').notNull()
});

export type CartItemInsert = typeof CartItemSchema.$inferInsert;
export const CartItemInsertSchema = createInsertSchema(CartItemSchema);
export type CartItemSelect = typeof CartItemSchema.$inferSelect;
export const CartItemSelectSchema = createSelectSchema(CartItemSchema);
