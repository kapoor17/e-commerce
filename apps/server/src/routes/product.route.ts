import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/product.controller';
import { isAdmin, validateSchema } from '../middlewares';
import { ProductInsertSchema } from '@e_commerce_package/models/types';
import z from 'zod';

const productRouter = Router();

productRouter.post(
  '/create',
  isAdmin,
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

productRouter.get(
  '/read',
  validateSchema({
    query: ProductInsertSchema.extend({
      name: ProductInsertSchema.shape.name.optional(),
      price: ProductInsertSchema.shape.price.optional(),
      inventory: z.coerce.number().optional()
    }).pick({
      name: true,
      price: true,
      inventory: true
    })
  }),
  readAll
);

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
  isAdmin,
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
  isAdmin,
  validateSchema({
    params: ProductInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default productRouter;
