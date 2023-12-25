import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { comparePassword, hashPassword } from '../../utils/passwordUtils';
import { verifyToken } from '../../utils/tokenUtils';
import { User } from '../User/user.model';
import { TUserLogin, TUserRegister } from './auth.interface';
import config from '../../config';

const register = async (payload: TUserRegister) => {
  const password = payload.password;

  const passwordHash = await hashPassword(password);

  const user = await User.create({ ...payload, password: passwordHash });

  const result = await User.findById(user._id).select('-__v');
  return result;
};

const login = async (payload: TUserLogin) => {
  const user = await User.findOne({ username: payload?.username }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await comparePassword(
    payload.password,
    user.password,
  );
  // checking password
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Wrong password');
  }

  const jwtPayload: JwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = verifyToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // delete password and unnecessary fields
  const result = { ...user._doc };
  delete result.password;
  delete result.__v;
  delete result.createdAt;
  delete result.updatedAt;

  return { user: result, token: accessToken };
};

export const AuthServices = {
  register,
  login,
};
