import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/cartItem.controller';
import { validateSchema } from '../middlewares';
import { CartItemInsertSchema } from '@e_commerce_package/models/types';

const cartItemRouter = Router();

cartItemRouter.post(
  '/create',
  validateSchema({
    body: CartItemInsertSchema.pick({
      cartId: true,
      productId: true,
      quantity: true
    })
  }),
  createOne
);

cartItemRouter.get('/read', readAll);

cartItemRouter.get(
  '/read/:id',
  validateSchema({
    params: CartItemInsertSchema.pick({
      id: true
    })
  }),
  readOne
);

cartItemRouter.patch(
  '/update/:id',
  validateSchema({
    body: CartItemInsertSchema.extend({
      cartId: CartItemInsertSchema.shape.cartId.optional(),
      productId: CartItemInsertSchema.shape.productId.optional(),
      quantity: CartItemInsertSchema.shape.quantity.optional()
    }).pick({
      cartId: true,
      productId: true,
      quantity: true
    }),
    params: CartItemInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

cartItemRouter.delete(
  '/delete/:id',
  validateSchema({
    params: CartItemInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default cartItemRouter;
