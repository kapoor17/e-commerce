import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/orderItem.controller';
import { isAdmin, validateSchema } from '../middlewares';
import { OrderItemInsertSchema } from '@e_commerce_package/models/types';

const orderItemRouter = Router();

orderItemRouter.post(
  '/create',
  validateSchema({
    body: OrderItemInsertSchema.pick({
      price: true,
      productId: true,
      orderId: true,
      quantity: true
    })
  }),
  createOne
);

orderItemRouter.get(
  '/read/:orderId',
  isAdmin,
  validateSchema({
    params: OrderItemInsertSchema.pick({
      id: true
    })
  }),
  readAll
);

orderItemRouter.get(
  '/read/:id',
  validateSchema({
    params: OrderItemInsertSchema.pick({
      id: true
    })
  }),
  readOne
);

orderItemRouter.patch(
  '/update/:id',
  isAdmin,
  validateSchema({
    body: OrderItemInsertSchema.extend({
      price: OrderItemInsertSchema.shape.price.optional(),
      productId: OrderItemInsertSchema.shape.productId.optional(),
      orderId: OrderItemInsertSchema.shape.orderId.optional(),
      quantity: OrderItemInsertSchema.shape.quantity.optional()
    }).pick({
      price: true,
      productId: true,
      orderId: true,
      quantity: true
    }),
    params: OrderItemInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

orderItemRouter.delete(
  '/delete/:id',
  isAdmin,
  validateSchema({
    params: OrderItemInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default orderItemRouter;
