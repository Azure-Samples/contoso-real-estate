import { Response } from 'node-fetch';
import { Payment } from '../models/payment';
import { AppConfig } from './config';
declare const _default: import("fastify").FastifyPluginAsync<import("fastify").FastifyPluginOptions, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export default _default;
export declare class HttpError extends Error {
    response: Response;
    constructor(response: Response, message?: string);
}
export declare class ApiService {
    private baseUrl;
    constructor(config: AppConfig);
    createPayment(payment: Partial<Payment>): Promise<unknown>;
    updateReservationStatus(reservationId: string, status: string): Promise<unknown>;
    private fetch;
}
declare module 'fastify' {
    interface FastifyInstance {
        api: ApiService;
    }
}
