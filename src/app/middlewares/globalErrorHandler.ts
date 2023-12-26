/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import errProcessor from '../errors/errPreProcessor/errPreProcessor';
import { TErrorResponse } from '../interface/TErrorResponse';
import httpStatus from 'http-status';

// eslint-disable-next-line
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    message: err.message || 'An error occurred',
    errorMessage: '',
    errorDetails: err,
  };

  errorResponse = errProcessor(err);

  const unauthorized = errorResponse?.statusCode === httpStatus.UNAUTHORIZED;
  const tokenErr = err.name === 'JsonWebTokenError';

  res.status(errorResponse.statusCode).json({
    success: false,
    statusCode: unauthorized || tokenErr ? undefined : errorResponse.statusCode,
    message: errorResponse.message,
    errorMessage: unauthorized
      ? 'You do not have the necessary permissions to access this resource.'
      : errorResponse.errorMessage,
    errorDetails: unauthorized ? null : errorResponse.errorDetails,
    stack: unauthorized || tokenErr ? null : err?.stack,
  });
};

export default globalErrorHandler;
