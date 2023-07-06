/**
 * file: packages/api-v4/src/functions/users.ts
 * description: file responsible for the 'Users' function
 * data: 07/06/2023
 * author: Glaucia Lemos
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { findUsers } from '../models/user';

export async function getUsers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const offset = Number(request.query.get('offset')) || 0;
    const limit = Number(request.query.get('limit')) || 10;

    if (offset < 0) {
      return {
        status: 400,
        jsonBody: {
          error: 'Offset must be greater than or equal to 0'
        },
      };
    } else if (limit < 0) {
      return {
        status: 400,
        jsonBody: {
          error: 'Limit must be greater than or equal to 0',
        },
      };
    } else if (offset > limit) {
      return {
        status: 400,
        jsonBody: {
          error: 'Offset must be less than or equal to limit',
        },
      };
    }

    try {
      const users = await findUsers({ offset, limit });

      if (users) {
        return {
          jsonBody: users,
        }
      } else {
        return {
          status: 404,
          jsonBody: {
            error: 'Users not found',
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

app.get('getUsers', {
  route: 'users',
  authLevel: 'anonymous',
  handler: getUsers,
});


