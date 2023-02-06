import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

export interface User {
  _id: ObjectId;
  id: string;
  name: string;
  role: "guest" | "renter" | "admin";
  status: "active" | "suspended" | "inactive";
  photo: string;
  address: string;
  payment: {
    _id: ObjectId;
  };
  email: string;
  auth: {
    provider: "aad" | "apple" | "twitter" | "google" | "facebook";
    token: string;
    lastLogin: number;
  };
  createdAt: string;
}

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

export default model<User>("User", UserSchema);
