/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/TErrorResponse';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid ID',
    errorMessage: `${err.value} is not valid ID!`,
    errorDetails: err,
  };
};

export default handleCastError;
