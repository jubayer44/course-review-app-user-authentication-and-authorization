import httpStatus from 'http-status';
import { TErrorResponse } from '../interface/TErrorResponse';

const handleJsonWebTokenError = (): TErrorResponse => {
  return {
    statusCode: httpStatus.UNAUTHORIZED,
    message: 'Unauthorized Access',
    errorMessage:
      'You do not have the necessary permissions to access this resource.',
    errorDetails: null,
  };
};

export default handleJsonWebTokenError;
