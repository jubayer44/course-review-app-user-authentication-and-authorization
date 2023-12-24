/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/TErrorResponse';

const handleDuplicateError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Duplicate Error',
    errorMessage: 'Duplicate Error',
    errorDetails: err,
  };
};

export default handleDuplicateError;
