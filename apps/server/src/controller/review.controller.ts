import { NextFunction, Request, Response } from 'express';
import ReviewService from '../services/review.service';
import {
  ReviewSelect,
  ReviewInsert,
  ProductSelect
} from '@e_commerce_package/models/types';
import { UnauthenticatedError } from '@e_commerce_package/errors';

export const createOne = async (
  req: Request<object, object, ReviewInsert>,
  res: Response<{ review: ReviewSelect }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const review = await ReviewService.createOne({
      ...req.body,
      userId: req.user.id
    });

    return res.json({ review });
  } catch (e) {
    return next(e);
  }
};

export const readAll = async (
  req: Request<{ productId: ProductSelect['id'] }>,
  res: Response<{ reviews: ReviewSelect[] }>,
  next: NextFunction
) => {
  try {
    const reviews = await ReviewService.findMany({
      productId: req.params.productId
    });

    return res.json({
      reviews
    });
  } catch (e) {
    return next(e);
  }
};

export const readOne = async (
  req: Request<Pick<ReviewSelect, 'id'>>,
  res: Response<{ review: ReviewSelect }>,
  next: NextFunction
) => {
  try {
    const review = await ReviewService.findOne({
      id: req.params.id
    });

    return res.json({
      review
    });
  } catch (e) {
    return next(e);
  }
};

export const updateOne = async (
  req: Request<Pick<ReviewSelect, 'id'>, object, Partial<ReviewInsert>>,
  res: Response<{ review: Omit<ReviewSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const review = await ReviewService.updateOne(req.params.id, req.body);

    return res.json({ review });
  } catch (e) {
    return next(e);
  }
};

export const deleteOne = async (
  req: Request<Pick<ReviewSelect, 'id'>>,
  res: Response<{ review: Omit<ReviewSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const review = await ReviewService.deleteOne(req.params.id);

    return res.json({ review });
  } catch (e) {
    return next(e);
  }
};
