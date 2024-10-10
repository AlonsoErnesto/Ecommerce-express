import { logger } from '@/server';
import mongoose from 'mongoose';

class MongoConnection {
  private static instance: MongoConnection;
  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
      logger.info('Connect to MongoDB successfully.');
    } catch (err) {
      logger.error(' Error connecting to MongoDB');
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Disconnect');
    } catch (error) {
      logger.error('error disconnecting from mongodb', error);
      throw error;
    }
  }
}

export default MongoConnection;
