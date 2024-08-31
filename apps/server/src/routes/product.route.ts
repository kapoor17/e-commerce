import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/product.controller';
import { validateSchema } from '../middlewares';
import { ProductInsertSchema } from '@e_commerce_package/models/types';

const productRouter = Router();

productRouter.post(
  '/create',
  validateSchema({
    body: ProductInsertSchema.pick({
      name: true,
      description: true,
      price: true,
      inventory: true
    })
  }),
  createOne
);

productRouter.get('/read', readAll);

productRouter.get(
  '/read/:id',
  validateSchema({
    params: ProductInsertSchema.pick({
      id: true
    })
  }),
  readOne
);

productRouter.patch(
  '/update/:id',
  validateSchema({
    body: ProductInsertSchema.extend({
      name: ProductInsertSchema.shape.name.optional(),
      description: ProductInsertSchema.shape.description.optional(),
      price: ProductInsertSchema.shape.price.optional(),
      inventory: ProductInsertSchema.shape.inventory.optional()
    }).pick({
      name: true,
      description: true,
      price: true,
      inventory: true
    }),
    params: ProductInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

productRouter.delete(
  '/delete/:id',
  validateSchema({
    params: ProductInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default productRouter;
