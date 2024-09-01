import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { CartSchema } from './carts';
import { ProductSchema } from './products';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { uuid } from 'drizzle-orm/pg-core';
import { BaseEntitySchema } from './base';

const { name, ...BaseEntitySchemaWithoutName } = BaseEntitySchema;
export const CartItemSchema = pgTable('cart_items', {
  ...BaseEntitySchemaWithoutName,
  cartId: uuid('cartId')
    .references(() => CartSchema.id)
    .notNull(),
  productId: uuid('productId')
    .references(() => ProductSchema.id)
    .notNull(),
  quantity: integer('quantity').notNull()
});

export type CartItemInsert = typeof CartItemSchema.$inferInsert;
export const CartItemInsertSchema = createInsertSchema(CartItemSchema);
export type CartItemSelect = typeof CartItemSchema.$inferSelect;
export const CartItemSelectSchema = createSelectSchema(CartItemSchema);
