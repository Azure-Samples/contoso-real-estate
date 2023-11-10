import process from "process";
import path from "path";
import { AppConfig } from "./appConfig";
import * as dotenv from "dotenv";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { configureMongoose } from "./mongoose";
import { logger, observability } from "./observability";

let configCache: AppConfig | undefined;
let dbInitialized = false;

export const getConfig: () => Promise<AppConfig> = async () => {

  console.log(`LOGGER: Config started`);


  if (configCache) {
    console.log(`LOGGER: Config already cached! configCache:${JSON.stringify(configCache)}`);
    return configCache;
  }

  console.log(`LOGGER: Loading configuration...process.env.NODE_ENV: ${process.env.NODE_ENV}`);

  // Load any ENV vars from local .env.local file
  if (process.env.NODE_ENV !== "production") {
    console.warn("Loading environment variables from root '.env.local' file. THIS SHOULD NOT BE USED IN PRODUCTION!");

    const pathEnv = path.resolve(process.cwd(), "../../.env.local")
    console.log(pathEnv)

    const test = dotenv.config({ path:pathEnv });

    console.log(test);
  }

  await populateEnvironmentFromKeyVault();

  configCache = {
    observability: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
      roleName: process.env.APPLICATIONINSIGHTS_NAME,
    },
    database: {
      connectionString: process.env.AZURE_COSMOS_CONNECTION_STRING_KEY || "mongodb://mongo:MongoPass@localhost:27017",
      database: process.env.AZURE_COSMOS_DATABASE_NAME || "contosoportal",
    },
    strapi: {
      database: process.env.STRAPI_DATABASE_NAME || "strapi",
      user: process.env.STRAPI_DATABASE_USERNAME || "postgres",
      password: process.env.STRAPI_DATABASE_PASSWORD || "PostgresPass",
      host: process.env.STRAPI_DATABASE_HOST || "localhost",
      port: process.env.STRAPI_DATABASE_PORT ? Number(process.env.STRAPI_DATABASE_PORT) : 5432,
      ssl: !process.env.STRAPI_DATABASE_HOST || process.env.STRAPI_DATABASE_SSL === "false" ? false : true,
    },
    stripeServiceUrl: process.env.STRIPE_SERVICE_URL || "http://localhost:4242",
  } as AppConfig;

  if(configCache.observability.connectionString){
    observability(configCache.observability)
  }

  console.log(`LOGGER: Configuration loaded successfully! configCache:${JSON.stringify(configCache)}`);
  logger.info(`Configuration loaded successfully! configCache:${JSON.stringify(configCache)}`);
  logger.info(`Process.env:${JSON.stringify(process.env)}`);

  return configCache;
};

const populateEnvironmentFromKeyVault = async () => {
  // If Azure key vault endpoint is defined
  // 1. Login with Default credential (managed identity or service principal)
  // 2. Overlay key vault secrets on top of ENV vars
  const keyVaultEndpoint = process.env.AZURE_KEY_VAULT_ENDPOINT || "";

  if (!keyVaultEndpoint) {
    return;
  }

  try {
    console.log("Populating environment from Azure KeyVault...");
    const credential = new DefaultAzureCredential();
    const secretClient = new SecretClient(keyVaultEndpoint, credential);

    for await (const secretProperties of secretClient.listPropertiesOfSecrets()) {
      const secret = await secretClient.getSecret(secretProperties.name);

      // KeyVault does not support underscores in key names and replaces '-' with '_'
      // Expect KeyVault secret names to be in conventional capitalized snake casing after conversion
      const keyName = secret.name.replace(/-/g, "_");
      process.env[keyName] = secret.value;
    }
  } catch (err: unknown) {
    console.log(
      `Error authenticating with Azure KeyVault. Ensure your managed identity or service principal has GET/LIST permissions. Error: ${err}`,
    );
    throw err;
  }
};

export async function initializeDatabaseConfiguration() {
  if (dbInitialized) {
    return;
  }
  const config = await getConfig();
  await configureMongoose(config.database);
  dbInitialized = true;
}


export async function initializeObservability() {
  /*if(observabilityInitialized){
    return;
  }
  const config = await getConfig();
  observability(config.observability);
  observabilityInitialized = true;*/
}
