import pg from "pg";
import { logger } from "./observability";
import { getConfig } from "./index";

export const pgQuery = async (transaction: string, args: any[]) => {
  let client;
  try {
    const config = (await getConfig()).strapi;
    client = new pg.Client(config);

    await client.connect();

    return await client.query(transaction, args);
  } catch (err) {
    logger.error(`PostgreSQL client database error: ${err}`);
    throw err;
  } finally {
    await client?.end();
  }
};
