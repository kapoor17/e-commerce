import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order.service';
import { OrderSelect, OrderInsert } from '@e_commerce_package/models/types';

export const createOne = async (
  req: Request<object, object, OrderInsert>,
  res: Response<{ order: OrderSelect }>,
  next: NextFunction
) => {
  try {
    const order = await OrderService.createOne(req.body);

    return res.json({ order });
  } catch (e) {
    return next(e);
  }
};

export const readAll = async (
  req: Request,
  res: Response<{ orders: OrderSelect[] }>,
  next: NextFunction
) => {
  try {
    const orders = await OrderService.findMany();

    return res.json({
      orders
    });
  } catch (e) {
    return next(e);
  }
};

export const readOne = async (
  req: Request<Pick<OrderSelect, 'id'>>,
  res: Response<{ order: OrderSelect }>,
  next: NextFunction
) => {
  try {
    const order = await OrderService.findOne({
      id: req.params.id
    });

    return res.json({
      order
    });
  } catch (e) {
    return next(e);
  }
};

export const updateOne = async (
  req: Request<Pick<OrderSelect, 'id'>, object, Partial<OrderInsert>>,
  res: Response<{ order: Omit<OrderSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const order = await OrderService.updateOne(req.params.id, req.body);

    return res.json({ order });
  } catch (e) {
    return next(e);
  }
};

export const deleteOne = async (
  req: Request<Pick<OrderSelect, 'id'>>,
  res: Response<{ order: Omit<OrderSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const order = await OrderService.deleteOne(req.params.id);

    return res.json({ order });
  } catch (e) {
    return next(e);
  }
};
