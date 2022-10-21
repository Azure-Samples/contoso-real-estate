import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { postFavoriteMock } from "../models/favorite";

const getFavorite: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { listing, user } = req.body;

  context.res = {
    body: await postFavoriteMock({ listing, user }),
  };
};

export default getFavorite;
