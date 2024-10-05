import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';
import { Admin } from './adminSchema';
import { env } from '@/common/utils/envConfig';
import { AdminRepository } from './adminRepository';

export class AdminService {
  private adminRepository: AdminRepository;

  constructor(repository: AdminRepository = new AdminRepository()) {
    this.adminRepository = repository;
  }

  async login(email: string, password: string): Promise<ServiceResponse<string | null>> {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) {
      const errorMessage = `Admin not found!`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Admin not found', null, StatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return ServiceResponse.failure('Invalid credentials', null, StatusCodes.UNAUTHORIZED);
    }

    // Generar el token JWT
    const token = jwt.sign({ adminId: admin._id, role: admin.role }, env.SECRET_KEY_JWT, {
      expiresIn: '3h', // Expira en 3 horas
    });

    return ServiceResponse.success(token, 'Login successful', StatusCodes.OK);
  }

  async create(adminData: Admin): Promise<ServiceResponse<Admin | null>> {
    try {
      const existingAdmin = await this.adminRepository.findByEmailOrName(
        adminData.email,
        adminData.name
      );
      if (existingAdmin) throw new Error('Email or Name already in use');
      //
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      adminData.password = hashedPassword;
      const admin = await this.adminRepository.create(adminData);
      return ServiceResponse.success('Admin created', admin);
    } catch (ex) {
      const errorMessage = `Error creating admin: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(`${errorMessage}`, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<Admin[] | null>> {
    try {
      const users = await this.adminRepository.findAll();
      if (!users || users.length === 0) {
        return ServiceResponse.failure('No Admins found', null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Admin[]>('Users found', users);
    } catch (ex) {
      const errorMessage = `Error finding all admins: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(`${errorMessage}`, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Retrieves a single user by their ID
  async findById(id: string): Promise<ServiceResponse<Admin | null>> {
    try {
      const user = await this.adminRepository.findById(id);
      if (!user) {
        return ServiceResponse.failure('Admin not found', null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Admin>('User found', user);
    } catch (ex) {
      const errorMessage = `Error finding admin with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while finding admin.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const adminService = new AdminService();
