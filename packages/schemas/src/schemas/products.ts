import { text, pgTable, decimal, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';

export const ProductSchema = pgTable('products', {
  ...BaseEntitySchema,
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  inventory: integer('inventory').notNull().default(0)
});

export type ProductInsert = typeof ProductSchema.$inferInsert;
export const ProductInsertSchema = createInsertSchema(ProductSchema);
export type ProductSelect = typeof ProductSchema.$inferSelect;
export const ProductSelectSchema = createSelectSchema(ProductSchema);
