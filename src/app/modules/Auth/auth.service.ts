import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { comparePassword, hashPassword } from '../../utils/passwordUtils';
import { createToken } from '../../utils/tokenUtils';
import { User } from '../User/user.model';
import { TChangePassword, TUserLogin, TUserRegister } from './auth.interface';
import config from '../../config';

const register = async (payload: TUserRegister) => {
  const password = payload.password;

  const passwordHash = await hashPassword(password);

  const passwordHistory = {
    password: passwordHash,
    changedAt: Date.now(),
  };

  const user = await User.create({
    ...payload,
    password: passwordHash,
    passwordHistory,
  });

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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const { _id, username, role, email } = user;

  // remove password from response
  const result = {
    _id,
    username,
    role,
    email,
  };

  return { user: result, token: accessToken };
};

const changePassword = async (payload: TChangePassword) => {};

export const AuthServices = {
  register,
  login,
  changePassword,
};
