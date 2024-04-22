// middleware/authenticateAdmin.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Administrator from '../models/Administrator';
declare module 'express' {
    interface Request {
        administrator?: Administrator; // Adicione a propriedade administrator ao tipo Request
    }
}    

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.session.token;

    if (!token) {
        return res.status(403).send('Unauthorized');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
        const administrator = await Administrator.findOne({ where: { email: decodedToken.email } });

        if (!administrator || !administrator.isAdmin) {
            return res.status(403).send('Unauthorized');
        }

        req.administrator = administrator;
        next();
    } catch (error) {
        console.error('Error authenticating administrator:', error);
        res.status(500).send('Internal server error');
    }
};

export default authenticateAdmin;