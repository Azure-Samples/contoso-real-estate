import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBar, MatSnackBarModule  } from '@angular/material/snack-bar';
import { environment } from "../../environments/environment";
import { CardListComponent } from "../shared/card-list/card-list.component";
import { FavoriteService } from "../shared/favorite.service";
import { InfiniteScrollingDirective } from "../shared/infinite-scrolling.directive";
import { ListingService } from "../shared/listing.service";
import { UserService } from "../shared/user/user.service";
import { RealtimeService } from "../shared/realtime.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
  standalone: true,
  imports: [CommonModule, CardListComponent, MatButtonModule, MatDividerModule, InfiniteScrollingDirective, MatSnackBarModule],
})
export class HomepageComponent implements OnInit {
  featuredListings: Listing[] = [];
  user = {} as User;
  blogUrl = environment.blogUrl;
  noresults = "Searching for featured listings. Please wait...";

  private listingService = inject(ListingService);
  private favoriteService = inject(FavoriteService);
  private userService = inject(UserService);
  private realtimeService = inject(RealtimeService);

  constructor(private snackBar: MatSnackBar) { }

  notify(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  async ngOnInit() {
    this.user = await this.userService.currentUser();
    this.featuredListings = await this.listingService.getFeaturedListings();

    // Get notification when someone favourtied a listing
    this.realtimeService.getNotifiedForFavourite((listingTitle) => {
      const notifyMessage = this.user?.name?.length > 0
        ? `Hurry up! Another user has favorited the listing "${listingTitle}".`
        : `A user has favorited the listing "${listingTitle}".`;
      this.notify(notifyMessage);
    });

    this.realtimeService.getNotifiedForCheckout(async (listing: Listing, from: string, to: string) => {
      // Get notification when someone booked any listing
      let notifyMessage = this.user?.name?.length > 0
        ? `Hurry up! Another user has booked the listing "${listing.title}" but didn't complete the payment.`
        : `A user has booked the listing "${listing}". but didn't complete the payment`;
      this.notify(notifyMessage);

      // Get notification when someone booked a listing which is favourited by current user
      const favourites: Array<Listing> = await this.favoriteService.getFavoritesByUser(this.user) ?? [];

      for (const favour of favourites) {
        if (favour.id === listing.id) {
          notifyMessage =
          `"${favour.title}" in your favorites has been booked and it's no longer available between the dates ${from} ~ ${to}.`
          this.notify(notifyMessage);
          break;
        }
      }
    });
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
