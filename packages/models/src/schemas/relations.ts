import { relations } from 'drizzle-orm';
import { CartSchema } from './carts';
import { CartItemSchema } from './cartItems';
import { OrderSchema } from './orders';
import { OrderItemSchema } from './orderItems';
import { ProductSchema } from './products';
import { UserSchema } from './users';

export const userRelations = relations(UserSchema, ({ one, many }) => ({
  cart: one(CartSchema),
  orders: many(OrderSchema)
}));

export const cartRelations = relations(CartSchema, ({ one, many }) => ({
  user: one(UserSchema, {
    fields: [CartSchema.userId],
    references: [UserSchema.id]
  }),
  cartItems: many(CartItemSchema)
}));

export const cartItemRelations = relations(CartItemSchema, ({ one }) => ({
  cart: one(CartSchema, {
    fields: [CartItemSchema.cartId],
    references: [CartSchema.id]
  }),
  product: one(ProductSchema, {
    fields: [CartItemSchema.productId],
    references: [ProductSchema.id]
  })
}));

export const orderRelations = relations(OrderSchema, ({ one, many }) => ({
  user: one(UserSchema, {
    fields: [OrderSchema.userId],
    references: [UserSchema.id]
  }),
  orderItems: many(OrderItemSchema)
}));

export const orderItemRelations = relations(OrderItemSchema, ({ one }) => ({
  order: one(OrderSchema, {
    fields: [OrderItemSchema.orderId],
    references: [OrderSchema.id]
  }),
  product: one(ProductSchema, {
    fields: [OrderItemSchema.productId],
    references: [ProductSchema.id]
  })
}));

export const productRelations = relations(ProductSchema, ({ many }) => ({
  cartItems: many(CartItemSchema),
  orderItems: many(OrderItemSchema)
}));
