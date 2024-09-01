import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/order.controller';
import { isAdmin, validateSchema } from '../middlewares';
import { OrderInsertSchema } from '@e_commerce_package/models/types';

const orderRouter = Router();

orderRouter.post('/create', createOne);

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
  isAdmin,
  validateSchema({
    params: OrderInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

orderRouter.delete(
  '/delete/:id',
  isAdmin,
  validateSchema({
    params: OrderInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default orderRouter;
