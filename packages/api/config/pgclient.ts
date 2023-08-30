import pg from "pg";
import { logger } from "./observability";
import { getConfig } from "./index";

export async function pgQuery(transaction: string, args?: any[]) {
  let client;
  try {
    const config = (await getConfig()).strapi;
    client = new pg.Client(config);

    console.log("Connecting to PostgreSQL database...");
    await client.connect();
    console.log("Connected to PostgreSQL database");

    return await client.query(transaction, args);
  } catch (err) {
    logger.error(`PostgreSQL database error: ${err}`);
    throw err;
  } finally {
    await client?.end();
  }
}
