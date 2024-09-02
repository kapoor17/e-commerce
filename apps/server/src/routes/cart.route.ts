import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/cart.controller';
import { isAdmin, validateSchema } from '../middlewares';
import { CartInsertSchema } from '@e_commerce_package/models/types';

const cartRouter = Router();

cartRouter.post('/create', createOne);

cartRouter.get('/read/all', isAdmin, readAll);

cartRouter.get('/read', readOne);

cartRouter.patch(
  '/update/:id',
  isAdmin,
  validateSchema({
    body: CartInsertSchema.extend({
      userId: CartInsertSchema.shape.userId.optional()
    }).pick({
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
  isAdmin,
  validateSchema({
    params: CartInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default cartRouter;
