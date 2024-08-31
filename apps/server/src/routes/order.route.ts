import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/order.controller';
import { validateSchema } from '../middlewares';
import { OrderInsertSchema } from '@e_commerce_package/models/types';

const orderRouter = Router();

orderRouter.post(
  '/create',
  validateSchema({
    body: OrderInsertSchema.pick({
      name: true,
      userId: true,
      totalAmount: true
    })
  }),
  createOne
);

orderRouter.get('/read', readAll);

orderRouter.get(
  '/read/:id',
  validateSchema({
    params: OrderInsertSchema.pick({
      id: true
    })
  }),
  readOne
);

orderRouter.patch(
  '/update/:id',
  validateSchema({
    body: OrderInsertSchema.extend({
      name: OrderInsertSchema.shape.name.optional(),
      userId: OrderInsertSchema.shape.userId.optional(),
      totalAmount: OrderInsertSchema.shape.totalAmount.optional()
    }).pick({
      name: true,
      userId: true,
      totalAmount: true
    }),
    params: OrderInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

orderRouter.delete(
  '/delete/:id',
  validateSchema({
    params: OrderInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default orderRouter;
