import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { findUsers } from "../models/user";

const getUsers: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  if (offset < 0) {
    context.res = {
      status: 400,
      body: {
        error: "Offset must be greater than or equal to 0",
      },
    };
    return;
  } else if (limit < 0) {
    context.res = {
      status: 400,
      body: {
        error: "Limit must be greater than or equal to 0",
      },
    };
    return;
  } else if (offset > limit) {
    context.res = {
      status: 400,
      body: {
        error: "Offset must be less than or equal to limit",
      },
    };
    return;
  }

  try {
    const users = await findUsers({ offset, limit });

    if (users) {
      context.res = {
        body: users,
      };
    } else {
      context.res = {
        status: 404,
        body: {
          error: "Users not found",
        },
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    };
  }
};

export default getUsers;
