import UserModel, { User } from "../models/user.schema";

export async function saveUserSession(user: User): Promise<User> {
  const { id: userId } = user;

  if (userId) {
    const existingModel = await UserModel.findOne({ id: userId });
    if (existingModel) {
      // Find by user ID not mongo ObjectId
      await UserModel.updateOne({ id: userId }, user);
      return existingModel;
    }
  }

  return await UserModel.create(user);
}

export async function findUserById(id: string): Promise<User | null> {
  return await UserModel.findById(id);
}

export async function findUsers({ offset, limit }: { offset: number; limit: number }): Promise<User[]> {
  return await UserModel.find().skip(offset).limit(limit);
}
