import { integer, numeric, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';
import { UserSchema } from './users';

export const OrderSchema = pgTable('orders', {
  ...BaseEntitySchema,
  userId: integer("user_id").notNull().references(() => UserSchema.id),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
});

export type OrderInsert = typeof OrderSchema.$inferInsert;
export const OrderInsertSchema = createInsertSchema(OrderSchema);
export type OrderSelect = typeof OrderSchema.$inferSelect;
export const OrderSelectSchema = createSelectSchema(OrderSchema);
