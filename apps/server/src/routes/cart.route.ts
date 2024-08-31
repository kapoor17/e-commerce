import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/cart.controller';
import { validateSchema } from '../middlewares';
import { CartInsertSchema } from '@e_commerce_package/models/types';

const cartRouter = Router();

cartRouter.post(
  '/create',
  validateSchema({
    body: CartInsertSchema.pick({
      name: true,
      userId: true
    })
  }),
  createOne
);

cartRouter.get('/read', readAll);

cartRouter.get(
  '/read/:id',
  validateSchema({
    params: CartInsertSchema.pick({
      id: true
    })
  }),
  readOne
);

cartRouter.patch(
  '/update/:id',
  validateSchema({
    body: CartInsertSchema.extend({
      name: CartInsertSchema.shape.name.optional(),
      userId: CartInsertSchema.shape.userId.optional()
    }).pick({
      name: true,
      userId: true
    }),
    params: CartInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

cartRouter.delete(
  '/delete/:id',
  validateSchema({
    params: CartInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default cartRouter;
