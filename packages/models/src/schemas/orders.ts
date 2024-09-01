import { uuid, pgTable, decimal } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';
import { UserSchema } from './users';

const { name, ...BaseEntitySchemaWithoutName } = BaseEntitySchema;
export const OrderSchema = pgTable('orders', {
  ...BaseEntitySchemaWithoutName,
  userId: uuid('userId')
    .notNull()
    .references(() => UserSchema.id)
});

export type OrderInsert = typeof OrderSchema.$inferInsert;
export const OrderInsertSchema = createInsertSchema(OrderSchema);
export type OrderSelect = typeof OrderSchema.$inferSelect;
export const OrderSelectSchema = createSelectSchema(OrderSchema);
