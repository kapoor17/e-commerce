import { NextFunction, Request, Response } from 'express';
import CartService from '../services/cart.service';
import {
  CartSelect,
  CartInsert,
  CartWithCartItems
} from '@e_commerce_package/models/types';
import { UnauthenticatedError } from '@e_commerce_package/errors';

export const createOne = async (
  req: Request,
  res: Response<{ cart: CartSelect }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const cart = await CartService.createOne({
      userId: req.user.id
    });

    return res.json({ cart });
  } catch (e) {
    return next(e);
  }
};

export const readAll = async (
  req: Request,
  res: Response<{ carts: CartSelect[] }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const carts = await CartService.findMany({
      userId: req.user.id
    });

    return res.json({
      carts
    });
  } catch (e) {
    return next(e);
  }
};

export const readOne = async (
  req: Request<Pick<CartSelect, 'id'>>,
  res: Response<{ cart: CartWithCartItems }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const cart = await CartService.findOne({
      id: req.user.cart.id,
      userId: req.user.id
    });

    return res.json({
      cart
    });
  } catch (e) {
    return next(e);
  }
};

export const updateOne = async (
  req: Request<Pick<CartSelect, 'id'>, object, Partial<CartInsert>>,
  res: Response<{ cart: Omit<CartSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const cart = await CartService.updateOne(req.params.id, req.body);

    return res.json({ cart });
  } catch (e) {
    return next(e);
  }
};

export const deleteOne = async (
  req: Request<Pick<CartSelect, 'id'>>,
  res: Response<{ cart: Omit<CartSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const cart = await CartService.deleteOne(req.params.id);

    return res.json({ cart });
  } catch (e) {
    return next(e);
  }
};
