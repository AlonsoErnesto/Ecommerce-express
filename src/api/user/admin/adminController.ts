import type { Request, RequestHandler, Response } from 'express';

import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { adminService } from './adminService';

class AdminController {
  // Método para login
  // En tu controlador
  public login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Llama al servicio para intentar autenticar
      const tokenResponse = await adminService.login(email, password);

      if (tokenResponse.success) {
        // Si el login es exitoso, retorna el token
        const token = tokenResponse.message;

        // Establecer la cookie para almacenar el token
        res.cookie('auth_token', token, {
          httpOnly: true, // La cookie no es accesible desde JavaScript
          // secure: process.env.NODE_ENV === 'production', // Solo enviar por HTTPS en producción
          secure: false, //
          sameSite: 'strict', // La cookie solo será enviada en solicitudes del mismo sitio
          maxAge: 3600000, // La cookie expirará en 1 hora (3600000 ms)
        });

        // Respuesta exitosa
        res.status(200).json({ authenticated: true });
      } else {
        // Si hay error, por ejemplo, credenciales inválidas
        res.status(401).json({ message: tokenResponse.message, authenticated: false });
      }
    } catch (error) {
      // Manejo de errores inesperados
      console.error(error); // Añadir log de error para depuración
      res.status(500).json({ message: 'Internal Server Error', error, authenticated: false });
    }
  };

  public createAdmin: RequestHandler = async (req: Request, res: Response) => {
    const adminData = req.body;
    const serviceResponse = await adminService.create(adminData);
    return handleServiceResponse(serviceResponse, res);
  };

  public getAdmins: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await adminService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getAdmin: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await adminService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const adminController = new AdminController();
