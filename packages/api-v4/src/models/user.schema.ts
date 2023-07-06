/**
 * file: packages/api-v4/src/models/user.schema.ts
 * description: file responsible for the 'User' mongoose schema
 * data: 07/06/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { model, Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["guest", "renter", "admin"],
    default: "guest",
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "suspended", "inactive"],
    default: "active",
  },
  photo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  payment: {
    _id: Schema.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  auth: {
    provider: {
      type: String,
      required: true,
      enum: ["aad", "github", "twitter", "google", "facebook"],
    },
    token: {
      type: String,
    },
    lastLogin: {
      type: Date,
      required: true,
    },
  },
  createdAt: {
    type: String,
    required: true,
  },
});

type User = InferSchemaType<typeof UserSchema>;

const UserModel = model('User', UserSchema)

export {
  User,
  UserModel
}




