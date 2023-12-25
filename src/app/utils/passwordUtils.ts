import crypto from 'crypto';

export const hashPassword = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePassword = (password: string, hashedPassword: string) => {
  if (hashPassword(password) === hashedPassword) {
    return true;
  }
  return false;
};
