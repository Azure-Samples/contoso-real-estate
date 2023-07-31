/**
 * file: packages/api-v4/src/models/listing.schema.ts
 * description: file responsible for the 'Listing' mongoose schema
 * data: 07/27/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { model, Schema, InferSchemaType } from 'mongoose';

const ListingSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: true,
  },
  isRecommended: {
    type: Boolean,
    required: true,
  },
  photos: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  ammenities: {
    type: String,
    required: true,
  },
  reviews_stars: {
    type: Number,
    required: true,
  },
  reviews_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

type Listing = InferSchemaType<typeof ListingSchema>;

const ListingModel = model('Listing', ListingSchema);

export {
  Listing,
  ListingModel
};