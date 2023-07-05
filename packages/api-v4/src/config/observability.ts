/**
 * file: packages/api-v4/src/config/observability.ts
 * description: file responsible for the observability configuration.
 * data: 07/05/2023
 * author: Glaucia Lemos
 */

import winston from 'winston';
import { ObservabilityConfig } from '../config/appConfig';

export enum LogLevel {
  Error = 'error',
  Warning = 'warn',
  Information = 'info',
  Verbose = 'verbose',
  Debug = 'debug',
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" })
  ],
});

export const observability = (config: ObservabilityConfig) => {
  logger.defaultMeta = {
    app: config.roleName,
  };

  // TODO: add application insights service
}



