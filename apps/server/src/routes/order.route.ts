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
      userId: true
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
      userId: OrderInsertSchema.shape.userId.optional()
    }).pick({
      userId: true
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
