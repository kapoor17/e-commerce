import { Router } from 'express';
import {
  readOne,
  readAll,
  deleteOne,
  updateOne,
  createOne
} from '../controller/user.controller';
import { isAdmin, validateSchema } from '../middlewares';
import { UserInsertSchema } from '@e_commerce_package/models/types';

const userRouter = Router();

userRouter.post(
  '/create',
  isAdmin,
  validateSchema({
    body: UserInsertSchema.pick({
      first_name: true,
      last_name: true,
      email: true,
      password: true
    })
  }),
  createOne
);

userRouter.get('/read', isAdmin, readAll);

userRouter.get('/read', readOne);

userRouter.patch(
  '/update',
  validateSchema({
    body: UserInsertSchema.extend({
      first_name: UserInsertSchema.shape.first_name.optional(),
      last_name: UserInsertSchema.shape.last_name.optional(),
      email: UserInsertSchema.shape.email.optional(),
      password: UserInsertSchema.shape.password.optional()
    }).pick({
      first_name: true,
      last_name: true,
      email: true,
      password: true
    })
  }),
  updateOne
);

userRouter.delete(
  '/delete/:id',
  isAdmin,
  validateSchema({
    params: UserInsertSchema.pick({
      id: true
    })
  }),
  deleteOne
);

export default userRouter;
