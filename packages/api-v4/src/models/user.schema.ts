/**
 * file: packages/api-v4/src/models/user.schema.ts
 * description: file responsible for the 'User' mongoose schema
 * data: 07/04/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose'

import IUser from '../interfaces/IUser';

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['guest', 'rent', 'admin'],
    default: 'guest',
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  photo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  payment: {
    _id: ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  auth: {
    provider: {
      type: String,
      required: true,
      enum: ['aad', 'apple', 'github', 'facebook', 'google', 'twitter'],
    },
    token: {
      type: String,
    },
    lastLogin: {
      type: Number,
    },
  },
  createdAt: {
    type: String,
  }
});

export default model<IUser>('User', UserSchema);



