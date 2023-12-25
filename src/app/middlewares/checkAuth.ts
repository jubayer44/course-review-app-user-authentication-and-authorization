import { NextFunction, Request, Response } from 'express';
import catchAsyncFunction from '../utils/catchAsyncFunction';
import { USER_ROLE } from '../modules/User/user.constant';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../utils/tokenUtils';
import config from '../config';
import { User } from '../modules/User/user.model';
import { JwtPayload } from 'jsonwebtoken';

export type TUserRole = keyof typeof USER_ROLE;

const checkAuth = (...roles: TUserRole[]) => {
  return catchAsyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      const decodedToken = verifyToken(
        token,
        config.jwt_access_secret as string,
      );

      req.user = decodedToken as JwtPayload;

      const { _id, email, role } = decodedToken as JwtPayload;

      if (roles?.length && !roles.includes(role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
      }

      const user = await User.findOne({ _id, email });

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }

      next();
    },
  );
};

export default checkAuth;
