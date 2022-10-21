import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  constructor() {}

  async addFavorite(listing: Listing, user: User) {
    const resource = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({
        listing,
        user,
      }),
    });
    return await resource.json();
  }

  async removeFavorite(listing: Listing, user: User) {
    const resource = await fetch(`/api/favorites?listing=${listing.id}&user=${user.id}`, {
      method: "DELETE",
    });
    const { success } = await resource.json();

    return !success;
  }

  async getFavorite(listing: Listing, user: User) {
    const resource = await fetch(`/api/favorites?listing=${listing.id}&user=${user.id}`);
    const response = await resource.json();

    if (response.error) {
      return null;
    }

    return response;
  }
}
