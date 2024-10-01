import { Model } from 'mongoose';
import { User, UserWithId } from './userSchema';
import { UserModel } from './userModel';

export class UserRepository {
  private readonly userModel: Model<User & Document>;

  constructor() {
    this.userModel = UserModel;
  }

  async create(userData: User): Promise<User> {
    const user = new this.userModel(userData);
    return await user.save();
  }

  async findAll(): Promise<UserWithId[]> {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<UserWithId | null> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserWithId | null> {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, userData: Partial<User>): Promise<UserWithId | null> {
    return await this.userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string): Promise<UserWithId | null> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findByEmailOrName(email: string, name: string): Promise<User | null> {
    return await this.userModel.findOne({ $or: [{ email }, { name }] });
  }
}
