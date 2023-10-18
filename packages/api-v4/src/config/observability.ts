import * as applicationInsights from "applicationinsights";
import winston from "winston";
import { ObservabilityConfig } from "../config/appConfig";
import { ApplicationInsightsTransport } from "./applicationInsightsTransports";

export enum LogLevel {
  Error = "error",
  Warning = "warn",
  Information = "info",
  Verbose = "verbose",
  Debug = "debug",
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.log", level: "error" })],
  exceptionHandlers: [new winston.transports.File({ filename: "exceptions.log" })],
});

export const observability = (config: ObservabilityConfig) => {
  logger.defaultMeta = {
    app: config.roleName,
  };

  try {
    applicationInsights
      .setup(config.connectionString)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .setSendLiveMetrics(true)
      .setDistributedTracingMode(applicationInsights.DistributedTracingModes.AI_AND_W3C);

    applicationInsights.defaultClient.context.tags[applicationInsights.defaultClient.context.keys.cloudRole] =
      config.roleName;

    // In the version 2.7.0 the `setAutoPopulateAzureProperties` are deprecated
    applicationInsights.defaultClient.setAutoPopulateAzureProperties(true);
    applicationInsights.start();

    const applicationInsightsTransport = new ApplicationInsightsTransport({
      client: applicationInsights.defaultClient,
      level: LogLevel.Information,
      handleExceptions: true,
      handleRejections: true,
    });

    logger.add(applicationInsightsTransport);
    logger.info("Added ApplicationInsights logger transport");
  } catch (err) {
    logger.error(
      `ApplicationInsights setup failed, ensure environment variable 'APPLICATIONINSIGHTS_CONNECTION_STRING' has been set. Error: ${err}`,
    );
  }
};

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
