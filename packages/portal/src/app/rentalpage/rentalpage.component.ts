import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { BookingFormComponent } from "../shared/booking-form/booking-form.component";
import { FavoriteService } from "../shared/favorite.service";
import { HasRoleDirective } from "../shared/has-role/has-role.directive";
import { ListingDetailComponent } from "../shared/listing-detail/listing-detail.component";
import { ListingService } from "../shared/listing.service";
import { UserRole, UserService } from "../shared/user/user.service";

@Component({
  selector: "app-rentalpage",
  templateUrl: "./rentalpage.component.html",
  styleUrls: ["./rentalpage.component.scss"],
  standalone: true,
  imports: [CommonModule, ListingDetailComponent, BookingFormComponent, HasRoleDirective],
})
export class RentalpageComponent implements OnInit {
  userRole: typeof UserRole = UserRole;
  listing: Listing;
  navigation: Navigation | null;
  reviewStars: number[] = [];
  isFavorited = false;
  reviewsMapping: { [k: string]: string } = { "=0": "No reviews", "=1": "1 message", other: "# reviews" };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingService,
    private favoriteService: FavoriteService,
    private userService: UserService,
  ) {
    this.navigation = this.router.getCurrentNavigation();
    this.listing = this.navigation?.extras.state?.["listing"] || null;
  }

  async ngOnInit() {
    const listing = await this.listingService.getListingById(this.route.snapshot.params["id"]);

    if (listing !== undefined) {
      this.listing = listing;
    } else {
      // TODO: fallback to 404 page
      this.router.navigate(["/404"]);
    }

    this.isFavorited = await this.favoriteService.getFavorite(this.listing, await this.userService.currentUser());
    this.reviewStars = Array(5)
      .fill(0)
      .map((x, i) => (i < this.listing?.reviews_stars ? 1 : 0));
  }

  async bookmark() {
    const status = await this.favoriteService.addFavorite(this.listing, await this.userService.currentUser());
    if (status === false) {
      alert("An error occurred while adding the listing to your favorites. Please try again later.");
      return;
    }

    this.isFavorited = status;

  }

  async share() {
    await this.listingService.share(this.listing);
  }

  async onRent(reservationDetails: ReservationRequest) {
    try {
      // const checkoutSession = await this.listingService.reserve(reservationDetails);
      // window.location.href = checkoutSession.sessionUrl;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // TODO: show error message in dialog
        alert(error.message);
      }
    }
  }
}
