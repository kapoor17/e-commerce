import { varchar, pgTable, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { BaseEntitySchema } from './base';
import { uuid } from 'drizzle-orm/pg-core';
import { CartSchema } from './carts';

const { name, ...BaseEntitySchemaWithoutName } = BaseEntitySchema;

export const UserSchema = pgTable('users', {
  ...BaseEntitySchemaWithoutName,
  first_name: varchar('firstName', { length: 50 }).notNull(),
  last_name: varchar('lastName', { length: 50 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 128 }).notNull()
});

export type UserInsert = typeof UserSchema.$inferInsert;
export const UserInsertSchema = createInsertSchema(UserSchema);
export type UserSelect = typeof UserSchema.$inferSelect;
export const UserSelectSchema = createSelectSchema(UserSchema);
