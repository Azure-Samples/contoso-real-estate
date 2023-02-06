import { pgQuery } from "../config/pgclient";
import FavoriteModel, { Favorite } from "./favorite.schema";
import { listingMapper } from "./listing";
import { Listing } from "./listing.schema";

export async function saveFavorite(fav: Favorite): Promise<Favorite | null> {
  const record = await findFavorite(fav);
  return record || (await FavoriteModel.create(fav));
}

export async function findFavorite(fav: Favorite): Promise<Favorite | null> {
  return await FavoriteModel.findOne({ userId: fav.userId, listingId: fav.listingId });
}

export async function getFavoritesByUserId({ userId }: { userId: string }): Promise<Favorite[]> {
  return await FavoriteModel.find({ userId });
}

export async function fetchFavoritesDataByUserId({ userId }: { userId: string }): Promise<Listing[]> {
  const favorites = await getFavoritesByUserId({ userId });

  // create a list of listing ids
  // use the listing ids to fetch the listing data from pgQuery using one single SQL query

  if (favorites.length === 0) {
    return [];
  }

  const favoritesIds = favorites.map(favorite => favorite.listingId);
  const favoritesData = await pgQuery(`SELECT * FROM listings WHERE id IN (${favoritesIds})`);
  return favoritesData.rows.map(listingMapper);
}

export async function removeFavorite(fav: Favorite): Promise<boolean> {
  const record = await findFavorite(fav);

  if (!record) {
    return false;
  }

  return await FavoriteModel.deleteOne({ userId: fav.userId, listingId: fav.listingId }).then(() => true);
}
