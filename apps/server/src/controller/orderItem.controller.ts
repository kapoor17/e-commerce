import { NextFunction, Request, Response } from 'express';
import OrderItemService from '../services/orderItem.service';
import {
  OrderItemSelect,
  OrderItemInsert
} from '@e_commerce_package/models/types';

export const createOne = async (
  req: Request<object, object, OrderItemInsert>,
  res: Response<{ orderItem: OrderItemSelect }>,
  next: NextFunction
) => {
  try {
    const orderItem = await OrderItemService.createOne(req.body);

    return res.json({ orderItem });
  } catch (e) {
    return next(e);
  }
};

export const readAll = async (
  req: Request,
  res: Response<{ orderItems: OrderItemSelect[] }>,
  next: NextFunction
) => {
  try {
    const orderItems = await OrderItemService.findMany();

    return res.json({
      orderItems
    });
  } catch (e) {
    return next(e);
  }
};

export const readOne = async (
  req: Request<Pick<OrderItemSelect, 'id'>>,
  res: Response<{ orderItem: OrderItemSelect }>,
  next: NextFunction
) => {
  try {
    const orderItem = await OrderItemService.findOne({
      id: req.params.id
    });

    return res.json({
      orderItem
    });
  } catch (e) {
    return next(e);
  }
};

export const updateOne = async (
  req: Request<Pick<OrderItemSelect, 'id'>, object, Partial<OrderItemInsert>>,
  res: Response<{ orderItem: Omit<OrderItemSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const orderItem = await OrderItemService.updateOne(req.params.id, req.body);

    return res.json({ orderItem });
  } catch (e) {
    return next(e);
  }
};

export const deleteOne = async (
  req: Request<Pick<OrderItemSelect, 'id'>>,
  res: Response<{ orderItem: Omit<OrderItemSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const orderItem = await OrderItemService.deleteOne(req.params.id);

    return res.json({ orderItem });
  } catch (e) {
    return next(e);
  }
};
