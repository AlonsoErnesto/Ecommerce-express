import type { Model } from 'mongoose';
import { AdminModel } from './adminModel';
import type { Admin, AdminWithId } from './adminSchema';

export class AdminRepository {
  private readonly adminModel: Model<Admin & Document>;

  constructor() {
    this.adminModel = AdminModel;
  }

  async create(adminData: Admin): Promise<Admin> {
    const admin = new this.adminModel(adminData);
    return await admin.save();
  }

  async findAll(): Promise<AdminWithId[]> {
    return await this.adminModel.find();
  }

  async findById(id: string): Promise<AdminWithId | null> {
    return await this.adminModel.findById(id);
  }

  async findByEmail(email: string): Promise<AdminWithId | null> {
    return await this.adminModel.findOne({ email });
  }

  async update(
    id: string,
    adminData: Partial<Admin>,
  ): Promise<AdminWithId | null> {
    return await this.adminModel.findByIdAndUpdate(id, adminData, {
      new: true,
    });
  }

  async delete(id: string): Promise<AdminWithId | null> {
    return await this.adminModel.findByIdAndDelete(id);
  }

  async findByEmailOrName(email: string, name: string): Promise<Admin | null> {
    return await this.adminModel.findOne({ $or: [{ email }, { name }] });
  }
}
