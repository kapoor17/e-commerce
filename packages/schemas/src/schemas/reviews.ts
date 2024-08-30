import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { UserSchema } from "./users";
import { ProductSchema } from "./products";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const ReviewSchema = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => UserSchema.id),
  productId: integer('product_id').references(() => ProductSchema.id),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type ReviewInsert = typeof ReviewSchema.$inferInsert;
export const ReviewInsertSchema = createInsertSchema(ReviewSchema);
export type ReviewSelect = typeof ReviewSchema.$inferSelect;
export const ReviewSelectSchema = createSelectSchema(ReviewSchema);
