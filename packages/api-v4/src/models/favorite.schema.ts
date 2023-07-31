/**
 * file: packages/api-v4/src/models/favorite.schema.ts
 * description: file responsible for the 'Payment' mongoose schema
 * data: 07/27/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { model, Schema } from 'mongoose';

export interface Favorite {
  userId: string;
  listingId: string;
  createdAt?: string;
}

const FavoriteSchema = new Schema<Favorite>({
  userId: {
    type: String,
    required: true,
  },
  listingId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default model<Favorite>('Favorite', FavoriteSchema);
