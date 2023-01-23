export interface ObservabilityConfig {
  connectionString: string;
  roleName: string;
}

export interface DatabaseConfig {
  connectionString: string;
  database: string;
  user?: string;
  password?: string;
  host?: string;
  port?: number;
  ssl?: boolean;
}

export interface StripeConfig {
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
}

export interface AppConfig {
  observability: ObservabilityConfig;
  database: DatabaseConfig;
  stripe: StripeConfig;
  strapi: DatabaseConfig;
  appDomain: string;
}
