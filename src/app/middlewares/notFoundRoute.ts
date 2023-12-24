import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

const notFoundRoute: RequestHandler = (req: Request, res: Response) => {
  const statusCode = httpStatus.NOT_FOUND;
  res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage: 'Route not found',
    errorDetails: '',
  });
};

export default notFoundRoute;
