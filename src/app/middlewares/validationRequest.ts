import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({ body: req.body });
    if (!result.success) {
      next(result.error);
    } else {
      req.body = result.data.body;
      next();
    }
  };
};

export default validationRequest;
