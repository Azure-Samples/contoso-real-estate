import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findPaymentById } from "../models/payment";

// GET: Get Paymentt by Id
export async function getPaymentById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getPaymentById processed request for url "${request.url}"`);

  //await initializeDatabaseConfiguration();

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
