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

  const passwordHash = hashPassword(password);

  const user = await User.create({
    ...payload,
    password: passwordHash,
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

  const isPasswordMatch = comparePassword(payload.password, user.password);
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

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.findById(userData._id).select(
    '+password +passwordHistory',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = comparePassword(
    payload.currentPassword,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Your current password is wrong',
    );
  }

  // get old password history
  const passwordHistory = user?.passwordHistory;

  const newHashPassword: string = hashPassword(payload.newPassword);

  // check if new password is same as old password
  const currentPassAndNewPassMatch = comparePassword(
    payload.newPassword,
    user.password,
  );

  if (currentPassAndNewPassMatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password change failed. Ensure the new password is unique and not among the last 2 used',
    );
  }

  // check if new password is same as old password in password history

  if (passwordHistory?.length) {
    passwordHistory.forEach((password) => {
      if (comparePassword(payload.newPassword, password.password)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${password?.changedAt?.toDateString()})`,
        );
      }
    });
  }

  const passSetToHistory = {
    password: user.password,
    changedAt: new Date(),
  };

  // add new password to password history
  passwordHistory.unshift(passSetToHistory);

  // remove a old password from password history
  if (passwordHistory?.length && passwordHistory.length > 2) {
    passwordHistory.pop();
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    password: newHashPassword,
    passwordHistory,
  });

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }

  return updatedUser;
};

export const AuthServices = {
  register,
  login,
  changePassword,
};
