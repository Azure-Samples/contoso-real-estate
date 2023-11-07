import { model, Schema } from "mongoose";

export interface Favorite {
  userId: string;
  listingId: string;
  createdAt?: string;
}

const FavoriteSchema = new Schema<Favorite>({
  userId: {
    type: String,
    required: true,
  },
  listingId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default model<Favorite>("Favorite", FavoriteSchema);
