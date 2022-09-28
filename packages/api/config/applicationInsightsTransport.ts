import { TelemetryClient } from "applicationinsights";
import { SeverityLevel, TraceTelemetry } from "applicationinsights/out/Declarations/Contracts";
import Transport, { TransportStreamOptions } from "winston-transport";
import { LogEntry } from "winston";
import { LogLevel } from "./observability";

export interface ApplicationInsightsTransportOptions extends TransportStreamOptions {
    client: TelemetryClient
    handleRejections?: boolean;
}

export class ApplicationInsightsTransport extends Transport {
    private client: TelemetryClient;

    constructor(opts: ApplicationInsightsTransportOptions) {
        super(opts);
        this.client = opts.client;
    }

    public log(info: LogEntry, callback: () => void) {
        const telemetry: TraceTelemetry = {
            severity: convertToSeverity(info.level),
            message: info.message,
        };

        this.client.trackTrace(telemetry);
        callback();
    }
}

const convertToSeverity = (level: LogLevel | string): SeverityLevel => {
    switch (level) {
    case LogLevel.Debug:
        return SeverityLevel.Verbose;
    case LogLevel.Verbose:
        return SeverityLevel.Verbose;
    case LogLevel.Error:
        return SeverityLevel.Error;
    case LogLevel.Warning:
        return SeverityLevel.Warning;
    case LogLevel.Information:
        return SeverityLevel.Information;
    default:
        return SeverityLevel.Verbose;
    }
};