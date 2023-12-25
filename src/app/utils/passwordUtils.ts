import bcrypt from 'bcrypt';
import config from '../config';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_routs));
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
