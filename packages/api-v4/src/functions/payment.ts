/**
 * file: packages/api-v4/src/functions/payment.ts
 * description: file responsible for the 'Payment' function
 * data: 07/18/2023
 * author: Glaucia Lemos
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { initializeDatabaseConfiguration } from '../config';
import { findPaymentById } from '../models/payment';

export async function getPayment(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  await initializeDatabaseConfiguration();

  const id = request.params.id ?? '';

  try {
    const payment = await findPaymentById(id);

  if (payment) {
    return {
      jsonBody: payment,
    }
  } else {
    return {
      status: 404,
      jsonBody: {
        error: 'Payment record not found',
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

app.get('getPayment', {
    route: 'payments/{id}',
    authLevel: 'anonymous',
    handler: getPayment
});
