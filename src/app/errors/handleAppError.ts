import { TErrorResponse } from '../interface/TErrorResponse';
import { AppError } from './AppError';

const handleAppError = (err: AppError): TErrorResponse => {
  return {
    statusCode: err.statusCode,
    message: err.message,
    errorMessage: err.message,
    errorDetails: err,
  };
};

export default handleAppError;
