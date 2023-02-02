import fp from 'fastify-plugin';
import fetch from 'node-fetch';
export default fp(async (fastify, opts) => {
    const config = fastify.config;
    fastify.decorate('api', new ApiService(config));
}, {
    name: 'api',
    dependencies: ['config'],
});
export class HttpError extends Error {
    constructor(response, message) {
        super(message);
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: response
        });
    }
}
export class ApiService {
    constructor(config) {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = `${config.apiUrl}/api`;
    }
    async createPayment(payment) {
        return this.fetch(`${this.baseUrl}/payments`, {
            method: 'POST',
            body: JSON.stringify(payment),
        });
    }
    async updateReservationStatus(reservationId, status) {
        return this.fetch(`${this.baseUrl}/reservations/${reservationId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    }
    async fetch(url, options) {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options === null || options === void 0 ? void 0 : options.headers,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new HttpError(response, `Failed to fetch ${url}`);
        }
        return response.json();
    }
}
//# sourceMappingURL=api.js.map