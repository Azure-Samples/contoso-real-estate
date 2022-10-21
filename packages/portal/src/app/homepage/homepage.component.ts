import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { CardListComponent } from "../shared/card-list/card-list.component";
import { FavoriteService } from "../shared/favorite.service";
import { ListingService } from "../shared/listing.service";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
  standalone: true,
  imports: [CardListComponent, MatButtonModule, MatDividerModule],
})
export class HomepageComponent implements OnInit {
  listings: Listing[] = [];
  constructor(
    private listingService: ListingService,
    private favoriteSerice: FavoriteService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    this.listings = (await this.listingService.getListings()).filter((listing: Listing) => listing.isFeatured);
  }

  async onFavoritedToggle(listing: Listing) {
    if (listing.$$isFavorited) {
      listing.$$isFavorited = await this.favoriteSerice.removeFavorite(listing, this.userService.currentUser());
    } else {
      listing.$$isFavorited = !!await this.favoriteSerice.addFavorite(listing, this.userService.currentUser());
    }
  }
}
