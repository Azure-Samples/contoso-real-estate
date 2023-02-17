import { AppConfig } from "./appConfig";
import * as dotenv from "dotenv";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { configureMongoose } from "./mongoose";
import { logger } from "./observability";

let configCache: AppConfig | undefined;
let dbInitialized = false;

export const getConfig: () => Promise<AppConfig> = async () => {
  if (configCache) {
    return configCache;
  }

  // Load any ENV vars from local .env file
  if (process.env.NODE_ENV !== "production") {
    dotenv.config();
  }

  await populateEnvironmentFromKeyVault();

  configCache = {
    observability: {
      connectionString: process.env.REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING,
      roleName: process.env.REACT_APP_APPLICATIONINSIGHTS_ROLE_NAME,
    },
    database: {
      connectionString: process.env.MONGO_CONNECTION_STRING,
      database: process.env.MONGO_DATABASE_NAME,
    },
    strapi: {
      database: process.env.STRAPI_DATABASE_NAME,
      user: process.env.STRAPI_DATABASE_USERNAME,
      password: process.env.STRAPI_DATABASE_PASSWORD,
      host: process.env.STRAPI_DATABASE_HOST,
      port: Number(process.env.STRAPI_DATABASE_PORT),
      ssl: process.env.STRAPI_DATABASE_SSL === "false" ? false : true,
    },
    stripeServiceUrl: process.env.STRIPE_SERVICE_URL,
  } as AppConfig;

  return configCache;
};

const populateEnvironmentFromKeyVault = async () => {
  // If Azure key vault endpoint is defined
  // 1. Login with Default credential (managed identity or service principal)
  // 2. Overlay key vault secrets on top of ENV vars
  const keyVaultEndpoint = process.env.AZURE_KEY_VAULT_ENDPOINT || "";

  if (!keyVaultEndpoint) {
    logger.warn("AZURE_KEY_VAULT_ENDPOINT has not been set. Configuration will be loaded from current environment.");
    return;
  }

  try {
    logger.info("Populating environment from Azure KeyVault...");
    const credential = new DefaultAzureCredential();
    const secretClient = new SecretClient(keyVaultEndpoint, credential);

    for await (const secretProperties of secretClient.listPropertiesOfSecrets()) {
      const secret = await secretClient.getSecret(secretProperties.name);

      // KeyVault does not support underscores in key names and replaces '-' with '_'
      // Expect KeyVault secret names to be in conventional capitalized snake casing after conversion
      const keyName = secret.name.replace(/-/g, "_");
      process.env[keyName] = secret.value;
    }
  } catch (err: any) {
    logger.error(
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
