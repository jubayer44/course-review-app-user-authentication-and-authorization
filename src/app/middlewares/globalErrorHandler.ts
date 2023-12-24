/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import errProcessor from '../errors/errPreProcessor/errPreProcessor';
import { TErrorResponse } from '../interface/TErrorResponse';

// eslint-disable-next-line
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    message: err.message || 'An error occurred',
    errorMessage: '',
    errorDetails: err,
  };

  errorResponse = errProcessor(err);

  res.status(errorResponse.statusCode).json({
    success: false,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
