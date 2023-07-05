/**
 * file: packages/api-v4/src/config/mongoose.ts
 * description: file responsible for the mongoose configuration.
 * data: 07/05/2023
 * author: Glaucia Lemos
 */

import mongoose from 'mongoose';
import { DatabaseConfig } from '../config/appConfig';

export const configureMongoose = async(config: DatabaseConfig) => {
  try {
    mongoose.set('strictQuery', false);
    const database = mongoose.connection;

    database.on('connecting', () => {
      console.log('Mongoose connecting...');
    });
    // TODO: add telemetry
  } catch (err) {
    // TODO
    console.log(`Error: ${err}`);
  }
}

