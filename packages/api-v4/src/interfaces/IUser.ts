/**
 * file: packages/api-v4/src/interfaces/IUser.ts
 * description: file responsible for the 'User' interface
 * data: 07/04/2023
 * author: Glaucia Lemos
 */

import { ObjectId } from 'mongodb';

export default interface User {
  _id?: ObjectId;
  id: string;
  name: string;
  role: 'guest' | 'rent' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  photo: string;
  address: string;
  payment: {
    _id: ObjectId;
  }
  email: string;
  auth: {
    provider: 'aad' | 'apple' | 'github' | 'facebook' | 'google' | 'twitter';
    token: string;
    lastLogin: number;
  };
  createdAt: string;
};

