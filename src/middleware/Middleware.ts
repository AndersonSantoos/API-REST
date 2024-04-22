import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
interface AuthenticatedRequest extends Request {
  user?: { email: string; positionId: number };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).send('Access token not provided');
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      console.error('Error decoding token:', err);
      return res.status(403).send('Invalid token');
    }

    if (!decoded.email || !decoded.positionId) {
      console.error('Token is missing required information');
      return res.status(403).send('Invalid token');
    }

    req.user = { email: decoded.email, positionId: decoded.positionId }; 
    next();
  });
};
