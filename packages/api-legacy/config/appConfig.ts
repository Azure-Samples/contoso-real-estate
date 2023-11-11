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

export interface AppConfig {
  observability: ObservabilityConfig;
  database: DatabaseConfig;
  strapi: DatabaseConfig;
  stripeServiceUrl: string;
}
