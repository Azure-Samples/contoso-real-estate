import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { FavoriteService } from "../shared/favorite.service";
import { UserService } from "../shared/user/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatTabsModule],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  listings: Listing[] = [];
  selectedTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private favoriteService: FavoriteService,
  ) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  async ngOnInit() {
    this.route.data.subscribe(async data => {
      this.user = data["user"];
      await this.listFavorites();
    });

    const tabs = ["favorites", "payments", "reservations"];

    this.route.paramMap.subscribe(async params => {
      const tab = params.get("tab");
      this.selectedTabIndex = tabs.indexOf(tab || "favorites");
    });
  }

  async listFavorites() {
    // this call allows us to get the count of favorites
    this.listings = await this.favoriteService.countFavoritesByUser(this.user);

    // this call allows us to get the actual listings
    this.listings = await this.favoriteService.getFavoritesByUser(this.user);
  }

  async removeFavorite(listing: Listing) {
    // remove the listing from the UI
    this.listings = this.listings.filter(l => l.id !== listing.id);

    // remove the favorite from the database
    await this.favoriteService.removeFavorite(listing, this.user);
  }
}
