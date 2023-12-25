import { Request, Response } from 'express';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { successResponse } from '../../utils/successResponse';
import { AuthServices } from './auth.service';

const register = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successfully',
    data: result,
  });
});

const changePassword = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const userData = req.user;

    const result = await AuthServices.changePassword(userData, req.body);

    successResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Password changed successfully',
      data: result,
    });
  },
);

export const AuthControllers = {
  register,
  login,
  changePassword,
};
