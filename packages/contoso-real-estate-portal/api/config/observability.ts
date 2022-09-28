import * as applicationInsights from "applicationinsights";
import { ObservabilityConfig } from "./appConfig";
import winston from "winston";
import { ApplicationInsightsTransport } from "./applicationInsightsTransport";

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
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "exceptions.log" }),
    ]
});

export const observability = (config: ObservabilityConfig) => {
    // Append App Insights to the winston logger
    logger.defaultMeta = {
        app: config.roleName
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

        applicationInsights.defaultClient.context.tags[applicationInsights.defaultClient.context.keys.cloudRole] = config.roleName;
        applicationInsights.defaultClient.setAutoPopulateAzureProperties(true);
        applicationInsights.start();

        const applicationInsightsTransport = new ApplicationInsightsTransport({
            client: applicationInsights.defaultClient,
            level: LogLevel.Information,
            handleExceptions: true, // Handles node unhandled exceptions
            handleRejections: true, // Handles node promise rejections
        });

        logger.add(applicationInsightsTransport);
        logger.info("Added ApplicationInsights logger transport");
    } catch (err) {
        logger.error(`ApplicationInsights setup failed, ensure environment variable 'APPLICATIONINSIGHTS_CONNECTION_STRING' has been set. Error: ${err}`);
    }
};

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
