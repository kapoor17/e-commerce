import { NextFunction, Request, Response } from 'express';
import CartItemService from '../services/cartItem.service';
import {
  CartItemSelect,
  CartItemInsert
} from '@e_commerce_package/models/types';
import { UnauthenticatedError } from '@e_commerce_package/errors';

export const createOne = async (
  req: Request<object, object, CartItemInsert>,
  res: Response<{ CartItem: CartItemSelect }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const CartItem = await CartItemService.createOne({
      ...req.body,
      cartId: req.user.cart.id
    });

    return res.json({ CartItem });
  } catch (e) {
    return next(e);
  }
};

export const readAll = async (
  req: Request,
  res: Response<{ CartItems: CartItemSelect[] }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const CartItems = await CartItemService.findMany({
      cartId: req.user.cart.id
    });

    return res.json({
      CartItems
    });
  } catch (e) {
    return next(e);
  }
};

export const readOne = async (
  req: Request<Pick<CartItemSelect, 'id'>>,
  res: Response<{ CartItem: CartItemSelect }>,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new UnauthenticatedError('User not found');
    const CartItem = await CartItemService.findOne({
      id: req.params.id,
      cartId: req.user.cart.id
    });

    return res.json({
      CartItem
    });
  } catch (e) {
    return next(e);
  }
};

export const updateOne = async (
  req: Request<Pick<CartItemSelect, 'id'>, object, Partial<CartItemInsert>>,
  res: Response<{ CartItem: Omit<CartItemSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const CartItem = await CartItemService.updateOne(req.params.id, req.body);

    return res.json({ CartItem });
  } catch (e) {
    return next(e);
  }
};

export const deleteOne = async (
  req: Request<Pick<CartItemSelect, 'id'>>,
  res: Response<{ CartItem: Omit<CartItemSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const CartItem = await CartItemService.deleteOne(req.params.id);

    return res.json({ CartItem });
  } catch (e) {
    return next(e);
  }
};
