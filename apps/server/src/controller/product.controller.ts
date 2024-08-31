import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/product.service';
import { ProductSelect, ProductInsert } from '@e_commerce_package/models/types';

export const createOne = async (
  req: Request<object, object, ProductInsert>,
  res: Response<{ product: ProductSelect }>,
  next: NextFunction
) => {
  try {
    const product = await ProductService.createOne(req.body);

    return res.json({ product });
  } catch (e) {
    return next(e);
  }
};

export const readAll = async (
  req: Request<Object, Partial<ProductInsert>>,
  res: Response<{ products: ProductSelect[] }>,
  next: NextFunction
) => {
  try {
    const products = await ProductService.findMany({
      ...req.query
    });

    return res.json({
      products
    });
  } catch (e) {
    return next(e);
  }
};

export const readOne = async (
  req: Request<Pick<ProductSelect, 'id'>, Partial<ProductInsert>>,
  res: Response<{ product: ProductSelect }>,
  next: NextFunction
) => {
  try {
    const product = await ProductService.findOne({
      ...req.query,
      id: req.params.id
    });

    return res.json({
      product
    });
  } catch (e) {
    return next(e);
  }
};

export const updateOne = async (
  req: Request<Pick<ProductSelect, 'id'>, object, Partial<ProductInsert>>,
  res: Response<{ product: Omit<ProductSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const product = await ProductService.updateOne(req.params.id, req.body);

    return res.json({ product });
  } catch (e) {
    return next(e);
  }
};

export const deleteOne = async (
  req: Request<Pick<ProductSelect, 'id'>>,
  res: Response<{ product: Omit<ProductSelect, 'password'> }>,
  next: NextFunction
) => {
  try {
    const product = await ProductService.deleteOne(req.params.id);

    return res.json({ product });
  } catch (e) {
    return next(e);
  }
};
