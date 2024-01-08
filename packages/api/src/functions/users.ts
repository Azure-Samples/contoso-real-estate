import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findUsers, findUserById, saveUserSession } from "../models/user";
import { User } from "../models/user.schema";

// GET: Get all users
export async function getUsers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getUsers processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const offset = Number(request.query.get("offset")) || 0;
  const limit = Number(request.query.get("limit")) || 10;

  if (offset < 0) {
    return {
      status: 400,
      jsonBody: {
        error: "Offset must be greater than or equal to 0",
      },
    };
  } else if (limit < 0) {
    return {
      status: 400,
      jsonBody: {
        error: "Limit must be greater than or equal to 0",
      },
    };
  } else if (offset > limit) {
    return {
      status: 400,
      jsonBody: {
        error: "Offset must be less than or equal to limit",
      },
    };
  }

  try {
    const users = await findUsers({ offset, limit });

    if (users) {
      return {
        jsonBody: users,
      };
    } else {
      return {
        status: 404,
        jsonBody: {
          error: "Users not found",
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: "Internal Server Error",
      },
    };
  }
}

// GET: Get User by Id
export async function getUserById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getUserById processed request for url "${request.url}"`);
  const id = request.params.id;

  await initializeDatabaseConfiguration();

  if (!id) {
    return {
      status: 400,
      jsonBody: {
        error: "Parameter 'id' is missing in /users/{id}",
      },
    };
  }

  try {
    const user = await findUserById(id);

    if (user) {
      return {
        jsonBody: user,
      };
    } else {
      return {
        status: 404,
        jsonBody: {
          error: "User not found",
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: "Internal Server Error",
      },
    };
  }
}

// POST: Create User
export async function postUsers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function postUsers processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const user = (await request.json()) as User;

  if (!user) {
    return {
      status: 400,
      jsonBody: {
        error: "User is required",
      },
    };
  }

  try {
    const storedUser = await saveUserSession(user);

    return {
      status: 201,
      jsonBody: storedUser,
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: "Internal Server Error",
      },
    };
  }
}
