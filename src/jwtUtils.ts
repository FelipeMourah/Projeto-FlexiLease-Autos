import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

export interface JwtPayload {
  userId: string;
}

export const generateToken = (payload: JwtPayload): string => {
  // Token expira em 12 horas
  return jwt.sign(payload, secretKey, { expiresIn: '12h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
