import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { findUserById } from "../models/user";

const getUserById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = req.params.id;

  if (!id) {
    context.res = {
      status: 400,
      body: {
        error: "Parameter 'id' is missing in /users/{id}",
      },
    };
    return;
  }

  try {
    const user = await findUserById(id);
    if (user) {
      context.res = {
        body: user,
      };
    } else {
      context.res = {
        status: 404,
        body: {
          error: "User not found",
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

export default getUserById;
