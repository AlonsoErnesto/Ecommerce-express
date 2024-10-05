import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../utils/envConfig';
import { ServiceResponse } from '../models/serviceResponse';
import { StatusCodes } from 'http-status-codes';

class Middlwares {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  verifyToken(token: string): JwtPayload | ServiceResponse {
    try {
      const decoded = jwt.verify(token, this.secretKey) as JwtPayload;
      return decoded;
    } catch (error) {
      return ServiceResponse.failure(
        'Error al verificar el token.',
        null,
        StatusCodes.UNAUTHORIZED
      );
    }
  }

  isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (!user || user.role !== 'admin') {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(
          ServiceResponse.failure(
            'Acceso denegado. Se requiere rol de administrador.',
            null,
            StatusCodes.FORBIDDEN
          )
        );
    }
    next();
  }

  verifyCookie(req: Request, res: Response, next: NextFunction) {
    // const token = req.headers['authorization']?.split(' ')[1];
    const token = req.cookies.auth_token;
    console.log('TOKENSS', token);
    if (!token) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    const decoded = this.verifyToken(token);
    if (decoded instanceof ServiceResponse) {
      return res.status(decoded.statusCode).json(decoded);
    }

    (req as any).user = decoded;
    next();
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.authToken;
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            ServiceResponse.failure(
              'Acceso denegado. Token no proporcionado.',
              null,
              StatusCodes.UNAUTHORIZED
            )
          );
      }

      const decoded = this.verifyToken(token);
      if (decoded instanceof ServiceResponse) {
        return res.status(decoded.statusCode).json(decoded);
      }
      (req as any).user = decoded;
      next();
    };
  }
}

// Exportar el middleware ya configurado
const middlewareInstance = new Middlwares(env.SECRET_KEY_JWT);
export const verifyCookie = middlewareInstance.verifyCookie.bind(middlewareInstance);
export const jwtMiddleware = middlewareInstance.middleware();
export const isAdminMiddleware = middlewareInstance.isAdmin.bind(middlewareInstance);
