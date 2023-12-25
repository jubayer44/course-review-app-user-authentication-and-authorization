import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn });
};
