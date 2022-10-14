import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getPaymentBySlugMock } from "../models/payment";

const data = async ({ slug }: { slug: number }) => await getPaymentBySlugMock({ slug });

const getPaymentBySlug: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const slug = Number(req.params.slug) || 0;

  const model = await data({ slug });

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

export default getPaymentBySlug;