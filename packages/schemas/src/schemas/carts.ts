import { integer, pgTable } from 'drizzle-orm/pg-core';
import { BaseEntitySchema } from './base';
import { createInsertSchema } from 'drizzle-zod';
import { UserSchema } from './users';

export const CartSchema = pgTable('carts', {
  ...BaseEntitySchema,
  userId: integer("user_id").notNull().references(() => UserSchema.id),
});

export type CartInsert = typeof CartSchema.$inferInsert;
export const CartInsertSchema = createInsertSchema(CartSchema);
export type CartSelect = typeof CartSchema.$inferSelect;
export const CartSelectSchema = createInsertSchema(CartSchema);
