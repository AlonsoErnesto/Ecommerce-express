import { logger } from '@/server';
import MongoConnection from './connection';
import { env } from '@/common/utils/envConfig';
const MONGO_URI = env.DB_URL_MONGO || 'process.env.MONGO_URI';

export const connectDB = async () => {
  try {
    const db = MongoConnection.getInstance();
    await db.connect(MONGO_URI);
  } catch (error) {
    logger.error('Failed connect db', error);
  }
};
