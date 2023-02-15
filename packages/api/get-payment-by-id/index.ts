import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findPaymentById } from "../models/payment";

const getPaymentById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  const id = req.params.id ?? '';
  const model = await findPaymentById(id);

  if (model) {
    context.res = {
      body: model,
    };
  } else {
    context.res = {
      status: 404,
      body: {
        error: "not found",
      },
    };
  }
};

export default getPaymentById;
