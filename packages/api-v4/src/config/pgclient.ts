import pg from 'pg';
import { logger } from './observability';
import { getConfig } from './index';

export async function pgQuery(transaction: string, args?: any[]) {
  let client;

  try {
    const config = (await getConfig()).strapi;
    client = new pg.Client(config);

    await client.connect();
    console.log('Connecting to PostgresSQL database...');

    return await client.query(transaction, args);

  } catch (err) {
    logger.error(`PostgresSQL database error, ${err}`);
    throw err;
  } finally {
    await client?.end();
  }
};
