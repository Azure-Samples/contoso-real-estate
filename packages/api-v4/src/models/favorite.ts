/**
 * file: packages/api-v4/src/models/favorite.ts
 * description: file responsible for the 'Favorite' model
 * data: 07/27/2023
 * author: Glaucia Lemos
 */

import { pgQuery } from "../config/pgclient";
import { Favorite, FavoriteModel } from "./favorite.schema";
import { listingMapper } from "./listing";
import { Listing } from "./listing.schema";

export async function saveFavorite(fav: Favorite): Promise<Favorite | null> {
  const recordFavorite = await findFavorite(fav);

  return recordFavorite || (await FavoriteModel.create(fav));
};

export async function findFavorite(fav: Favorite): Promise<Favorite | null> {
  return await FavoriteModel.findOne({ userId: fav.userId, listingId: fav.listingId });
};

export async function getFavoritesByUserId({ userId }: { userId: string }): Promise<Favorite[]> {
  return await FavoriteModel.find({ userId });
};

export async function fetchFavoritesDataByUserId({ userId }: { userId: string }): Promise<Listing[]> {
  const favorites = await getFavoritesByUserId({ userId });

  if (favorites.length === 0) {
    return [];
  };

  const favoritesIds = favorites.map(favorite => favorite.listingId);
  const favoritesData = await pgQuery(`SELECT * FROM listings WHERE id IN (${favoritesIds})`);

  return favoritesData.rows.map(listingMapper);
};

export async function removeFavorites(fav: Favorite): Promise<boolean> {
  const recordFavorite = await findFavorite(fav);

  if (!recordFavorite) {
    return false;
  }

  return await FavoriteModel.deleteOne({ userId: fav.userId, listingId: fav.listingId }).then(() => true);
};

