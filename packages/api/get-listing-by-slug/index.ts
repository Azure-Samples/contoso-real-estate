import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getListingBySlug } from "../models/listing";

const data = async ({ slug }: { slug?: string }) => await getListingBySlug({ slug });

export default async function (context: Context, req: HttpRequest): Promise<void> {
  const { slug } = req.params;

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
}
