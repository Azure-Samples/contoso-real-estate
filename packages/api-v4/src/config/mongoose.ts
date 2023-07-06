/**
 * file: packages/api-v4/src/config/mongoose.ts
 * description: file responsible for the mongoose configuration.
 * data: 07/06/2023
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

    // STOP HERE - TODO: add database logs

  } catch (err) {
    // TODO
    console.log(`Error: ${err}`);
  }
}

