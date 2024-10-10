import { ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';
import { logger } from '@/server';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { ClientRepository } from './clientRepository';
import type { Client } from './clientSchema';

export class ClientService {
  private clientRepository: ClientRepository;
  constructor(repository: ClientRepository = new ClientRepository()) {
    this.clientRepository = repository;
  }

  async login(email: string, password: string) {
    const client = await this.clientRepository.findByEmail(email);
    if (!client) {
      const errorMessage = 'Client not found';
      logger.error(errorMessage);
      return ServiceResponse.failure(
        `${errorMessage}`,
        null,
        StatusCodes.NO_CONTENT,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');
    const token = jwt.sign(
      {
        clientId: client._id,
        email: client.email,
        role: client.role,
      },
      env.SECRET_KEY_JWT,
      {
        expiresIn: '3h',
      },
    );
    return ServiceResponse.success(token, 'Login Successful', StatusCodes.OK);
  }

  async create(clientData: Client): Promise<ServiceResponse<Client | null>> {
    try {
      const existingClient = await this.clientRepository.findByEmailOrName(
        clientData.email,
        clientData.name,
      );
      if (existingClient) throw new Error('Email or Name already in use');
      const hashedPassword = await bcrypt.hash(clientData.password, 10);
      clientData.password = hashedPassword;
      const admin = await this.clientRepository.create(clientData);
      return ServiceResponse.success('User created successfully', admin);
    } catch (ex) {
      const errorMessage = `Error creating user:${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        `${errorMessage}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const clientService = new ClientService();
