import { text, pgTable, decimal, integer, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';

export const ProductSchema = pgTable('products', {
  ...BaseEntitySchema,
  description: text('description').notNull(),
  price: decimal('price').notNull(),
  inventory: integer('inventory').notNull().default(0),
  image: varchar('image', { length: 256 }).notNull()
});

export type ProductInsert = typeof ProductSchema.$inferInsert;
export const ProductInsertSchema = createInsertSchema(ProductSchema);
export type ProductSelect = typeof ProductSchema.$inferSelect;
export const ProductSelectSchema = createSelectSchema(ProductSchema);
