/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from 'zod';
import handleZodError from '../handleZodError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import handleValidationError from '../handleValidationError';
import handleCastError from '../handleCastError';
import handleDuplicateError from '../handleDuplicateError';
import { AppError } from '../AppError';
import handleAppError from '../handleAppError';
import { TErrorResponse } from '../../interface/TErrorResponse';
import { JsonWebTokenError } from 'jsonwebtoken';
import handleJsonWebTokenError from '../jsonWebTokenError';

const errProcessor = (err: any): TErrorResponse => {
  if (err instanceof ZodError) {
    return handleZodError(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    return handleValidationError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    return handleCastError(err);
  } else if (err?.code && err?.code === 11000) {
    return handleDuplicateError(err);
  } else if (err instanceof JsonWebTokenError) {
    return handleJsonWebTokenError();
  } else if (err instanceof AppError) {
    return handleAppError(err);
  } else {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Unknown Error',
      errorMessage: err?.message,
      errorDetails: err,
    };
  }
};

export default errProcessor;
