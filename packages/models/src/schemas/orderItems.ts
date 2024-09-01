import { decimal, uuid, pgTable, integer } from 'drizzle-orm/pg-core';
import { OrderSchema } from './orders';
import { ProductSchema } from './products';
import { BaseEntitySchema } from './base';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const { name, ...BaseEntitySchemaWithoutName } = BaseEntitySchema;
export const OrderItemSchema = pgTable('order_items', {
  ...BaseEntitySchemaWithoutName,
  orderId: uuid('orderId').references(() => OrderSchema.id),
  productId: uuid('productId').references(() => ProductSchema.id),
  quantity: integer('quantity').notNull(),
  price: decimal('price').notNull()
});

export type OrderItemInsert = typeof OrderItemSchema.$inferInsert;
export const OrderItemInsertSchema = createInsertSchema(OrderItemSchema);
export type OrderItemSelect = typeof OrderItemSchema.$inferSelect;
export const OrderItemSelectSchema = createSelectSchema(OrderItemSchema);
