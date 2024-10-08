import type { Model } from 'mongoose';
import { ClientModel } from './clientModel';
import type { Client, ClientWithId } from './clientSchema';

export class ClientRepository {
  private readonly clientModel: Model<Client & Document>;
  constructor() {
    this.clientModel = ClientModel;
  }

  async create(clientData: Client): Promise<Client> {
    const client = new this.clientModel(clientData);
    return await client.save();
  }

  async findAll(): Promise<ClientWithId[]> {
    return await this.clientModel.find();
  }

  async findByEmail(email: string): Promise<ClientWithId | null> {
    return await this.clientModel.findOne({
      email,
    });
  }

  async findByEmailOrName(email: string, name: string): Promise<Client | null> {
    return await this.clientModel.findOne({
      $or: [{ email }, { name }],
    });
  }
}
