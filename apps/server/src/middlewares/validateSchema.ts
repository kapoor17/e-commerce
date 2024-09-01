import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError as ZE } from 'zod';
import { ZodError } from '@e_commerce_package/errors';

interface IValidator {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}
export function validateSchema(validator: IValidator) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('validating schema', req.params, req.query);
    try {
      if (validator.body) {
        req.body = await validator.body.parseAsync(req.body);
      }
      if (validator.params) {
        req.params = await validator.params.parseAsync(req.params);
      }
      if (validator.query) {
        req.query = await validator.query.parseAsync(req.query);
      }
      console.log('validating schema after', req.params, req.query);
      next();
    } catch (err) {
      let error = err;
      if (err instanceof ZE) {
        error = new ZodError(err.message);
      }
      console.error('Could not parse the request');
      next(error);
    }
  };
}
