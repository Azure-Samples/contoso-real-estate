/**
 * file: packages/api-v4/src/functions/user.ts
 * description: file responsible for the 'User' function
 * data: 07/06/2023
 * author: Glaucia Lemos
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { findUserById } from '../models/user';

export async function getUserById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const id = request.params.id;

  if (!id) {
    return {
      status: 400,
      jsonBody: {
        error: "Parameter 'id' is missing in /users/{id}",
      }
    }
  }

  try {
    const user = await findUserById(id);

    if (user) {
      return {
        jsonBody: user,
      }
    } else {
      return {
        status: 404,
        jsonBody: {
          error: 'User not found',
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: 'Internal Server Error',
      },
    };
  }
};

app.get('getUser', {
  route: 'users/{id}',
  authLevel: 'anonymous',
  handler: getUserById,
})
