import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { environment } from "../../environments/environment";
import { CardListComponent } from "../shared/card-list/card-list.component";
import { FavoriteService } from "../shared/favorite.service";
import { InfiniteScrollingDirective } from "../shared/infinite-scrolling.directive";
import { ListingService } from "../shared/listing.service";
import { UserService } from "../shared/user/user.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
  standalone: true,
  imports: [CommonModule, CardListComponent, MatButtonModule, MatDividerModule, InfiniteScrollingDirective],
})
export class HomepageComponent implements OnInit {
  featuredListings: Listing[] = [];
  user = {} as User;
  blogUrl = environment.blogUrl;
  noresults = "Searching for featured listings. Please wait...";

  private listingService = inject(ListingService);
  private favoriteService = inject(FavoriteService);
  private userService = inject(UserService);

  async ngOnInit() {
    this.user = await this.userService.currentUser();
    this.featuredListings = await this.listingService.getFeaturedListings();
  }

  async onFavoritedToggle(listing: Listing | null) {
    if (!listing) {
      return;
    }

    if (listing.$$isFavorited) {
      const status = await this.favoriteService.removeFavorite(listing, this.user);
      if (status === false) {
        alert("An error occurred while removing the listing from your favorites. Please try again later.");
        return;
      }

      listing.$$isFavorited = false;
    } else {
      const status = !(await this.favoriteService.addFavorite(listing, this.user));
      if (status === false) {
        alert("An error occurred while adding the listing to your favorites. Please try again later.");
        return;
      }

      listing.$$isFavorited = true;
    }
  }

  async loadNextFeaturedListings() {
    const nextListings = await this.listingService.getFeaturedListings({ offset: this.featuredListings.length });

    if (nextListings?.length) {
      this.featuredListings = [...this.featuredListings, ...nextListings];
    }
  }
}
