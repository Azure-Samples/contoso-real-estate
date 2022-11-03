export interface ObservabilityConfig {
  connectionString: string;
  roleName: string;
}

export interface DatabaseConfig {
  connectionString: string;
  databaseName: string;
}

export interface StripeConfig {
    publicKey: string
    secretKey: string
    webhookSecret: string
}

export interface AppConfig {
  observability: ObservabilityConfig
  database: DatabaseConfig
  stripe: StripeConfig
  appDomain: string
}
