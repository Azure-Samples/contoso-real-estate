import UserModel, { User } from "../models/user.schema";

export async function saveUserSession(user: User): Promise<User> {
  const userModel = new UserModel(user);
  await userModel.updateOne({ upsert: true });
  return userModel;
}


export async function findUserById(id: string): Promise<User | null> {
  return await UserModel.findById(id);
}

export async function findUsers({offset, limit}: {offset: number, limit: number}): Promise<User[]> {
  return await UserModel.find().skip(offset).limit(limit);
}