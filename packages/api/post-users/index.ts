import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { saveUserSession } from "../models/user";

const postUsers: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  let user = req.body;

  if (!user) {
    context.res = {
      status: 400,
      body: {
        error: "User is required",
      },
    };
    return;
  }

  user = {
    ...user,
    createdAt: +new Date(),
    status: "active", //  TODO: fetch the user status from another authority
  };

  try {
    const storedUser = await saveUserSession(user);
    context.res = {
      body: storedUser,
    };
  } catch (error: any) {
    context.res = {
      status: 500,
      body: {
        error: error?.message,
      },
    };
  }
};

export default postUsers;
