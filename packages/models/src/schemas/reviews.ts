import { uuid, pgTable, text, integer } from 'drizzle-orm/pg-core';
import { UserSchema } from './users';
import { ProductSchema } from './products';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';

export const ReviewSchema = pgTable('reviews', {
  ...BaseEntitySchema,
  userId: uuid('userId').references(() => UserSchema.id),
  productId: uuid('productId').references(() => ProductSchema.id),
  rating: integer('rating').notNull(),
  comment: text('comment')
});

export type ReviewInsert = typeof ReviewSchema.$inferInsert;
export const ReviewInsertSchema = createInsertSchema(ReviewSchema);
export type ReviewSelect = typeof ReviewSchema.$inferSelect;
export const ReviewSelectSchema = createSelectSchema(ReviewSchema);
