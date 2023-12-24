/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from '../interface/TErrorResponse';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorsObj = Object.values(err?.errors);

  if (errorsObj[0]?.name === 'CastError') {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Invalid ID',
      errorMessage: `${errorsObj[0]?.value} is not valid ID!`,
      errorDetails: errorsObj[0],
    };
  }

  let errorMessage: string = '';

  // Concatenate error messages
  if (err?.errors) {
    Object.values(err?.errors)?.forEach(
      (mes) => (errorMessage = errorMessage + `${mes} `),
    );
  }

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessage: errorMessage,
    errorDetails: err,
  };
};

export default handleValidationError;
