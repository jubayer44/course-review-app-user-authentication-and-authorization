import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsyncFunction = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsyncFunction;
