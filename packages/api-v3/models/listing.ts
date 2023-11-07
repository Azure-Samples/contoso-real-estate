import { pgQuery } from "../config/pgclient";
import { Listing } from "./listing.schema";

export async function getListings({
  offset,
  limit,
  featured,
}: {
  offset: number;
  limit: number;
  featured: boolean;
}): Promise<Listing[]> {
  const query = `SELECT * FROM listings WHERE is_featured = $1 ORDER BY id LIMIT $2 OFFSET $3`;
  const params = [featured, limit, offset];

  const listings = await pgQuery(query, params);
  return listings.rows.map(listingMapper);
}

export async function getListingById({ id }: { id: string | undefined }): Promise<Listing> {
  const listing = await pgQuery(`SELECT * FROM listings WHERE id = $1 LIMIT 1`, [id]);
  return listing.rows.map(listingMapper)[0];
}

export function listingMapper(row: Listing) {
  row.fees = row.fees.split("|") as any;
  row.photos = row.photos.split("|") as any;
  row.address = row.address.split("|") as any;
  row.ammenities = row.ammenities.split(",") as any;
  return row;
}
