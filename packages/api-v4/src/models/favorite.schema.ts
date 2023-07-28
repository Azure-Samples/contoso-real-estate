/**
 * file: packages/api-v4/src/models/favorite.schema.ts
 * description: file responsible for the 'Payment' mongoose schema
 * data: 07/27/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { model, Schema, InferSchemaType } from 'mongoose';

const FavoriteSchema = new Schema({
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

type Favorite = InferSchemaType<typeof FavoriteSchema>;

const FavoriteModel = model('Favorite', FavoriteSchema);

export {
  Favorite,
  FavoriteModel
};
