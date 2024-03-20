import { model, Schema } from "mongoose";
import { User } from "../interface/models";

const UserSchema = new Schema<User>({
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
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<User>("User", UserSchema);
