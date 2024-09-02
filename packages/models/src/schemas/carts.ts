import { uuid, pgTable } from 'drizzle-orm/pg-core';
import { BaseEntitySchema } from './base';
import { createInsertSchema } from 'drizzle-zod';
import { UserSchema } from './users';

const { name, ...BaseEntitySchemaWithoutName } = BaseEntitySchema;
export const CartSchema = pgTable('carts', {
  ...BaseEntitySchemaWithoutName,
  userId: uuid('userId')
    .references(() => UserSchema.id)
    .unique()
    .notNull()
});

export type CartInsert = typeof CartSchema.$inferInsert;
export const CartInsertSchema = createInsertSchema(CartSchema);
export type CartSelect = typeof CartSchema.$inferSelect;
export const CartSelectSchema = createInsertSchema(CartSchema);
