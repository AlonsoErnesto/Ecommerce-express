import { Request, RequestHandler, Response } from 'express';
import { clientService } from './clientService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

class ClientController {
  public login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await clientService.login(email, password);
      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({
          message: 'Invalid email or password',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error,
      });
    }
  };

  public createClient: RequestHandler = async (req: Request, res: Response) => {
    const clientData = req.body;
    const serviceResponse = await clientService.create(clientData);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const clientController = new ClientController();
