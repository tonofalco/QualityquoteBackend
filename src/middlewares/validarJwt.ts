import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz Request para incluir uid, name y role
declare global {
    namespace Express {
        interface Request {
            uid?: string;
            name?: string;
            role?: string;
        }
    }
}

export const validarJwt = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
        return; // solo return para salir, NO return res.status(...)
    }

    try {
        const secret = process.env.SECRET_JWT_SEED;

        if (!secret) {
            throw new Error('Falta JWT key');
        }

        const payload = jwt.verify(token, secret);

        if (typeof payload !== 'object' || !payload) {
            throw new Error('Token payload inválido');
        }

        const { uid, name, role } = payload as { uid: string; name: string; role: string };

        req.uid = uid;
        req.name = name;
        req.role = role;

        req.uid = payload.uid;
        req.name = payload.name;
        req.role = payload.role;

        next();
    } catch (error) {
        console.error('Error al verificar el token JWT:', error);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
        return; // igual solo return para salir
    }
};

