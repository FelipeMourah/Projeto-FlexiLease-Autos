import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../../../../jwtUtils'; // Verifique o caminho correto para seus utilitários JWT

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const jwtMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Corrigido para split(' ')

  if (!token) {
    return res.status(403).json({ message: 'Invalid token format' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }

  req.user = decoded;
  next();
};
