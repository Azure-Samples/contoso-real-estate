import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  async addFavorite(listing: Listing, user: User) {
    const resource = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({
        listing,
        user,
      }),
    });

    if (resource.status !== 200) {
      return false;
    }

    const { success } = await resource.json();
    return success;
  }

  async removeFavorite(listing: Listing, user: User) {
    const resource = await fetch(`/api/favorites?listing=${listing.id}&user=${user.id}`, {
      method: "DELETE",
    });

    if (resource.status !== 200) {
      return false;
    }

    const { success } = await resource.json();
    return success;
  }

  async getFavorite(listing: Listing, user: User) {
    const resource = await fetch(`/api/favorites?listing=${listing.id}&user=${user.id}`);

    if (resource.status !== 200) {
      return null;
    }

    return await resource.json();
  }
}
