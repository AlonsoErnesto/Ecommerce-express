import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '@/api/user/userRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';
import { User } from './userSchema';
import { env } from '@/common/utils/envConfig';

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async login(email: string, password: string): Promise<ServiceResponse<string | null>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      const errorMessage = `User not found!`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred in login', null, StatusCodes.NO_CONTENT);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar el token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      env.SECRET_KEY_JWT,
      {
        expiresIn: '3h',
      }
    );

    // Retornar el token como parte del payload exitoso
    return ServiceResponse.success(token, 'Login successful', StatusCodes.OK);
  }

  async create(userData: User): Promise<ServiceResponse<User | null>> {
    try {
      const existingUser = await this.userRepository.findByEmailOrName(
        userData.email,
        userData.name
      );
      if (existingUser) {
        throw new Error('Email or Name already in use');
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const user = await this.userRepository.create(userData);
      return ServiceResponse.success('User created', user);
    } catch (ex) {
      const errorMessage = `Error creating user: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while creating user.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<User[] | null>> {
    try {
      const users = await this.userRepository.findAll();
      if (!users || users.length === 0) {
        return ServiceResponse.failure('No Users found', null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User[]>('Users found', users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while retrieving users.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Retrieves a single user by their ID
  async findById(id: string): Promise<ServiceResponse<User | null>> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User>('User found', user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while finding user.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const userService = new UserService();
