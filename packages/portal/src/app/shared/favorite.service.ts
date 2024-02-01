import { Injectable, inject } from "@angular/core";
import { UserRole } from "./user/user.service";
import { RealtimeService } from "./realtime.service";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  private realtimeService = inject(RealtimeService);

  async addFavorite(listing: Listing, user: User) {
    const resource = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({
        listing,
        user,
      }),
    });
    this.realtimeService.broadcastFavouriteNotification(listing);
    return resource.status === 200;
  }

  async removeFavorite(listing: Listing, user: User) {
    const resource = await fetch(`/api/favorites?listingId=${listing.id}&userId=${user.id}`, {
      method: "DELETE",
    });

    return resource.status === 204;
  }

  async getFavorite(listing: Listing, user: User) {
    if (user.id === UserRole.Guest) {
      // Users that are not logged in cannot have favorites
      return null;
    }

    const resource = await fetch(`/api/favorites?listingId=${listing.id}&userId=${user.id}`);

    if (resource.status !== 200) {
      return null;
    }

    const favorites = await resource.json();
    return favorites.at(0);
  }

  // Note: this API call is slow because we need to aggregate the favorites from the mongoDB and PostgresSQL databases
  async getFavoritesByUser(user: User) {
    const resource = await fetch(`/api/favorites?userId=${user.id}&aggregate=true`);

    if (resource.status !== 200) {
      return [];
    }

    return await resource.json();
  }

  // Note: this API call is fast because we only need to count the favorites from the mongoDB database
  async countFavoritesByUser(user: User) {
    const resource = await fetch(`/api/favorites?userId=${user.id}`);

    if (resource.status !== 200) {
      return [];
    }

    return await resource.json();
  }
}
