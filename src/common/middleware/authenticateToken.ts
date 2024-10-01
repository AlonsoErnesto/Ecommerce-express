import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../utils/envConfig';
import { ServiceResponse } from '../models/serviceResponse';
import { StatusCodes } from 'http-status-codes';

// Clase JWT para manejar la validación
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
        'An error occurred while verifying the token.',
        null,
        StatusCodes.UNAUTHORIZED // Cambiado a UNAUTHORIZED
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
    next(); // Si es admin, continua con el siguiente middleware
  }

  // Método para utilizar como middleware en rutas protegidas
  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers['authorization']?.split(' ')[1];

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
        return res.status(decoded.statusCode).json(decoded); // Maneja el caso de error
      }

      (req as any).user = decoded; // Se agrega el payload decodificado al objeto `req` para su uso posterior.
      next();
    };
  }
}

// Exportar el middleware ya configurado
export const jwtMiddleware = new Middlwares(env.SECRET_KEY_JWT).middleware();
export const isAdminMiddleware = new Middlwares(env.SECRET_KEY_JWT).isAdmin.bind(
  new Middlwares(env.SECRET_KEY_JWT)
);
