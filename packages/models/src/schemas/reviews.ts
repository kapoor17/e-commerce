import { uuid, pgTable, text, integer } from 'drizzle-orm/pg-core';
import { UserSchema } from './users';
import { ProductSchema } from './products';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';

const { name, ...BaseEntitySchemaWithoutName } = BaseEntitySchema;
export const ReviewSchema = pgTable('reviews', {
  ...BaseEntitySchemaWithoutName,
  userId: uuid('userId')
    .references(() => UserSchema.id)
    .notNull(),
  productId: uuid('productId')
    .references(() => ProductSchema.id)
    .notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment')
});

export type ReviewInsert = typeof ReviewSchema.$inferInsert;
export const ReviewInsertSchema = createInsertSchema(ReviewSchema);
export type ReviewSelect = typeof ReviewSchema.$inferSelect;
export const ReviewSelectSchema = createSelectSchema(ReviewSchema);
