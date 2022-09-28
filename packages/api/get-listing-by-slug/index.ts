import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getListingBySlugMock } from "../models/listings";

const data = async ({ slug }: { slug: number }) => await getListingBySlugMock({ slug });

const getListings: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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

export default getListings;
