/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from 'zod';
import { TErrorResponse } from '../interface/TErrorResponse';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError): TErrorResponse => {
  let errorMessage: string = '';

  // Concatenate multiple error messages
  if (err?.issues?.length > 0) {
    err?.issues?.forEach(
      (item: any) =>
        (errorMessage =
          errorMessage +
          `${item.path[item.path.length - 1]} is ${item?.message}. `),
    );
  }

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessage: errorMessage,
    errorDetails: err,
  };
};

export default handleZodError;
