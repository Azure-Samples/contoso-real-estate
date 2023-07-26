/**
 * file: packages/api-v4/src/models/reservation-request.ts
 * description: file responsible for the 'ReservationRequest' model
 * data: 07/18/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

export interface ReservationRequest {
  userId: string;
  listingId: string;
  from: string;
  to: string;
  guests: number;
};
