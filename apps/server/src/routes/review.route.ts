import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/review.controller';
import { validateSchema } from '../middlewares';
import { ReviewInsertSchema } from '@e_commerce_package/models/types';

const reviewRouter = Router();

reviewRouter.post(
  '/create',
  validateSchema({
    body: ReviewInsertSchema.pick({
      name: true,
      userId: true,
      productId: true,
      rating: true,
      comment: true
    })
  }),
  createOne
);

reviewRouter.get('/read', readAll);

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
  validateSchema({
    body: ReviewInsertSchema.extend({
      name: ReviewInsertSchema.shape.name.optional(),
      userId: ReviewInsertSchema.shape.userId.optional(),
      productId: ReviewInsertSchema.shape.productId.optional(),
      rating: ReviewInsertSchema.shape.rating.optional(),
      comment: ReviewInsertSchema.shape.comment.optional()
    }).pick({
      name: true,
      userId: true,
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
  validateSchema({
    params: ReviewInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default reviewRouter;
