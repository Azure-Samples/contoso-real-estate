import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findPaymentById, findPaymentsByUserId, savePayment, isValidPayment } from "../models/payment";
import { findUserById } from '../models/user';
import { updateReservationStatus } from '../models/reservation';
import { Payment } from '../models/payment.schema';

// GET: Get Payment by Id
export async function getPaymentById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getPaymentById processed request for url "${request.url}"`);

  // uncomment if you decide to test the api in production (using database)
  await initializeDatabaseConfiguration();

  const id = request.params.id ?? '';

  const payment = await findPaymentById(id);

  if (payment) {
    return {
      jsonBody: payment,
    };
  } else {
    return {
      status: 404,
      jsonBody: {
        error: "Payment record not found",
      },
    };
  }
};

// GET: Get Payments
export async function getPayments(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getPayments processed request for url "${request.url}"`);

  const offset = Number(request.query.get('offset')) || 0;
  const limit = Number(request.query.get('limit')) || 10;
  const { userId } = request.params;

  if (!userId || userId === 'undefined') {
    return {
      status: 400,
      jsonBody: {
        error: 'UserId is missing',
      },
    };
  }

  if (offset < 0) {
    return {
      status: 400,
      jsonBody: {
        error: 'Offset must be greater than or equal to 0',
      },
    };
  } else if (limit < 0) {
    return {
      status: 400,
      jsonBody: {
        error: 'Limit must be greater than or equal to 0',
      },
    };
  } else if (offset > limit) {
    return {
      status: 400,
      jsonBody: {
        error: 'Offset must be less than or equal to limit',
      },
    };
  }

  try {
    const payments = await findPaymentsByUserId(userId, offset, limit);

    if (payments) {
      return {
        jsonBody: payments,
      };
    } else {
      return {
        status: 404,
        jsonBody: {
          error: 'Payments not found',
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: 'Internal Server Error',
      },
    };
  }
};

// POST: Create Payment
export async function postPayment(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function createPayment processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const payment = await request.json() as Payment;

  const isValid = isValidPayment(payment);

  if (!isValid) {
    return {
      status: 400,
      jsonBody: {
        error: 'Invalid payment data. Make sure userId, reservationId, provider, status, amount, and currency are specified correctly.',
      },
    };
  }

  try {
    const user = await findUserById(payment.userId);
    if (!user) {
      return {
        status: 404,
        jsonBody: {
          error: `Error payment received for unknown user id: ${payment.userId}`,
        },
      };
    }

    const reservationRecord = await updateReservationStatus(payment.reservationId, 'active');
    if (!reservationRecord) {
      return {
        status: 404,
        jsonBody: {
          error: `Error payment received for unknown reservation id: ${payment.reservationId}`,
        },
      };
    }

    const paymentRecord = await savePayment(payment);

    return {
      status: 201,
      jsonBody: paymentRecord,
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: 'Internal Server Error',
      },
    };
  }
};


