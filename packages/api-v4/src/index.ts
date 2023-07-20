/**
 * file: packages/api-v4/src/index.ts
 * description: file responsible for the main entry point of the api functions (v4)
 * data: 07/19/2023
 * author: Glaucia Lemos
 */

import { app } from "@azure/functions";
import { httpTriggerTest } from './functions/httpTriggerTest';
import { getUsers, getUserById } from './functions/users';
import { getPaymentById, getPayments} from './functions/payments';

app.get('httpTriggerTest', {
  authLevel: 'anonymous',
  handler: httpTriggerTest
});

app.get('get-users', {
  route: 'users',
  authLevel: 'anonymous',
  handler: getUsers,
});

app.get('get-users-by-id', {
  route: 'users/{id}',
  authLevel: 'anonymous',
  handler: getUserById,
});

app.get('get-payment-by-id', {
  route: 'payments/{id}',
  authLevel: 'anonymous',
  handler: getPaymentById
});

app.get('get-payments', {
  route: 'payments',
  authLevel: 'anonymous',
  handler: getPayments
});

