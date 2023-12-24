import { Response } from 'express';
import { TSuccessResponse } from '../interface/TSuccessResponse';

export const successResponse = <T>(
  res: Response,
  data: TSuccessResponse<T>,
) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    meta: data?.meta,
    data: data.data,
  });
};
