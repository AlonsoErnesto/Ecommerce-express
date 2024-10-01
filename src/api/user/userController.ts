import type { Request, RequestHandler, Response } from 'express';

import { userService } from '@/api/user/userService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

class UserController {
  // Método para login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      // Espera el resultado de la promesa
      const token = await userService.login(email, password);
      // Verifica si el token es nulo
      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error });
    }
  }

  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const userData = req.body;
    const serviceResponse = await userService.create(userData);
    return handleServiceResponse(serviceResponse, res);
  };

  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await userService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
