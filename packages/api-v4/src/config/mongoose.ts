import mongoose from 'mongoose';
import { DatabaseConfig } from '../config/appConfig';
import { logger } from './observability';

export const configureMongoose = async (config: DatabaseConfig) => {
  try {
    mongoose.set('strictQuery', false);
    const database = mongoose.connection;
    database.on('connecting', () => logger.info('Mongoose connecting...'));
    database.on('connected', () => logger.info('Mongoose connected successfully!'));
    database.on('disconnecting', () => logger.info('Mongoose disconnecting...'));
    database.on('disconnected', () => logger.info('Mongoose disconnected successfully!'));
    database.on('error', (err: Error) => logger.error('Mongoose database error:', err));

    if (database.readyState !== 1) {
      console.log('Mongoose connecting...');
      await mongoose.connect(config.connectionString, { dbName: config.database });
      console.log('Mongoose connected successfully!');
    }
    else {
      console.log('Mongoose already connected! Status:', database.readyState);
    }
  } catch (err) {
    logger.error(`Mongoose database error: ${err}`);
  }
};

