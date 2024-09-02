import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/review.controller';
import { isAdmin, validateSchema } from '../middlewares';
import {
  ProductInsertSchema,
  ReviewInsertSchema
} from '@e_commerce_package/models/types';

const reviewRouter = Router();

reviewRouter.post(
  '/create',
  validateSchema({
    body: ReviewInsertSchema.pick({
      productId: true,
      rating: true,
      comment: true
    })
  }),
  createOne
);

reviewRouter.get(
  '/read/:productId',
  validateSchema({
    params: ProductInsertSchema.pick({
      id: true
    })
  }),
  readAll
);

reviewRouter.get(
  '/read/:id',
  validateSchema({
    params: ReviewInsertSchema.pick({
      id: true
    })
  }),
  readOne
);

reviewRouter.patch(
  '/update/:id',
  isAdmin,
  validateSchema({
    body: ReviewInsertSchema.extend({
      productId: ReviewInsertSchema.shape.productId.optional(),
      rating: ReviewInsertSchema.shape.rating.optional(),
      comment: ReviewInsertSchema.shape.comment.optional()
    }).pick({
      productId: true,
      rating: true,
      comment: true
    }),
    params: ReviewInsertSchema.pick({
      id: true
    })
  }),
  updateOne
);

reviewRouter.delete(
  '/delete/:id',
  isAdmin,
  validateSchema({
    params: ReviewInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default reviewRouter;
