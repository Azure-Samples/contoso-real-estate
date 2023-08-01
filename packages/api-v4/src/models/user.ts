/**
 * file: packages/api-v4/src/models/user.ts
 * description: file responsible for the 'User' model
 * data: 08/01/2023
 * author: Glaucia Lemos
 */

import UserModel, { User } from "../models/user.schema";

export async function saveUserSession(user: User): Promise<User> {
  const { id } = user;

  if (id) {
    const existingModel = await findUserById(id);
    if (existingModel) {
      await UserModel.updateOne({ id }, {
        $set: {
          auth: user.auth,
        },
      });
      return existingModel;
    }
  }

  return await UserModel.create(user);
};

export async function findUserById(id: string): Promise<User | null> {
  return await UserModel.findOne({ id });
};

export async function findUsers({ offset, limit }: { offset: number; limit: number }): Promise<User[]> {
  return await UserModel
    .find()
    .skip(offset)
    .limit(limit);
};

