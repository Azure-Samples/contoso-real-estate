import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

export interface Listing {
  _id: ObjectId;
  id: string;
  title: string;
  slug: string;
  bathrooms: number;
  bedrooms: number;
  description: string;
  type: string;
  isFeatured: boolean;
  isRecommended: boolean;
  photos: string;
  capacity: number;
  ammenities: string;
  reviews_stars: number;
  reviews_number: number;
  address: string;
  fees: string;
  createdAt: string;
}

const ListingSchema = new Schema<Listing>({
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
    type: [String],
    required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  ammenities: {
    type: [String],
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
    type: [String],
    required: true,
  },

  fees: {
    type: [String],
    required: true,
  },

  createdAt: {
    type: String,
    required: true,
  },
});

export default model<Listing>("Listing", ListingSchema);
