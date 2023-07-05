/**
 * file: packages/api-v4/src/config/applicationInsightsTransports.ts
 * description: file responsible for the applicationInsightsTransports configuration.
 * data: 07/05/2023
 * author: Glaucia Lemos
 */

import { TelemetryClient } from 'applicationinsights';
import Transport, { TransportStreamOptions } from 'winston-transport';


export interface ApplicationInsightsTransportOptions extends TransportStreamOptions {
  client: TelemetryClient;
  handleRejections?: boolean;
}
