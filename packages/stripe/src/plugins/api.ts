import fp from "fastify-plugin";
import fetch, { Response, RequestInit } from "node-fetch";
import { Payment } from "../models/payment.js";
import { AppConfig } from "./config.js";

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(
  async (fastify, opts) => {
    const config = fastify.config;
    fastify.decorate("api", new ApiService(config));
  },
  {
    name: "api",
    dependencies: ["config"],
  },
);

export class HttpError extends Error {
  constructor(public response: Response, message?: string) {
    super(message);
  }
}

export class ApiService {
  private baseUrl: string;

  constructor(config: AppConfig) {
    this.baseUrl = `${config.apiUrl}/api`;
  }

  async createPayment(payment: Partial<Payment>) {
    return this.fetch(`${this.baseUrl}/payments`, {
      method: "POST",
      body: JSON.stringify(payment),
    });
  }

  async updateReservationStatus(reservationId: string, status: string) {
    return this.fetch(`${this.baseUrl}/reservations/${reservationId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  private async fetch(url: string, options?: RequestInit) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new HttpError(response, `Failed to fetch ${url}`);
    }
    return response.json();
  }
}

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    api: ApiService;
  }
}
