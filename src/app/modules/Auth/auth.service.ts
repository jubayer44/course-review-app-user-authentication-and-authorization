import { hashPassword } from '../../utils/passwordUtils';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';

const register = async (payload: TUser) => {
  const password = payload.password;

  const passwordHash = await hashPassword(password);

  const user = await User.create({ ...payload, password: passwordHash });
  return user;
};

export const AuthServices = {
  register,
};
