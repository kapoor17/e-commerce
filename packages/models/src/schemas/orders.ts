import { uuid, pgTable, decimal } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';
import { UserSchema } from './users';

export const OrderSchema = pgTable('orders', {
  ...BaseEntitySchema,
  userId: uuid('userId')
    .notNull()
    .references(() => UserSchema.id),
  totalAmount: decimal('totalAmount').notNull()
});

export type OrderInsert = typeof OrderSchema.$inferInsert;
export const OrderInsertSchema = createInsertSchema(OrderSchema);
export type OrderSelect = typeof OrderSchema.$inferSelect;
export const OrderSelectSchema = createSelectSchema(OrderSchema);
