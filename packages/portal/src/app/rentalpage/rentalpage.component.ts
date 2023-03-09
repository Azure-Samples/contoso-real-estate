import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { BookingFormComponent } from "../shared/booking-form/booking-form.component";
import { FavoriteButtonComponent } from "../shared/favorite-button/favorite-button/favorite-button.component";
import { HasRoleDirective } from "../shared/has-role/has-role.directive";
import { ListingDetailComponent } from "../shared/listing-detail/listing-detail.component";
import { ListingService } from "../shared/listing.service";
import { UserRole, UserService } from "../shared/user/user.service";

@Component({
  selector: "app-rentalpage",
  templateUrl: "./rentalpage.component.html",
  styleUrls: ["./rentalpage.component.scss"],
  standalone: true,
  imports: [CommonModule, ListingDetailComponent, BookingFormComponent, HasRoleDirective, FavoriteButtonComponent],
})
export class RentalpageComponent implements OnInit {
  userRole: typeof UserRole = UserRole;
  listing: Listing;
  user: User;
  navigation: Navigation | null;
  reviewStars: number[] = [];
  isLoading = true;
  reviewsMapping: { [k: string]: string } = { "=0": "No reviews", "=1": "1 message", other: "# reviews" };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingService,
    private userService: UserService,
  ) {
    this.navigation = this.router.getCurrentNavigation();
    this.listing = this.navigation?.extras.state?.["listing"] || null;
    this.user = this.navigation?.extras.state?.["user"] || null;
  }

  async ngOnInit() {
    this.user = await this.userService.currentUser();
    if (this.user === null) {
      this.router.navigate(["/login"]);
      return;
    }

    const listing = await this.listingService.getListingById(this.route.snapshot.params["id"]);

    if (listing !== undefined) {
      this.listing = listing;
      this.isLoading = false;
    } else {
      this.router.navigate(["/404"]);
    }

    this.reviewStars = Array(5)
      .fill(0)
      .map((x, i) => (i < this.listing?.reviews_stars ? 1 : 0));
  }

  async share() {
    await this.listingService.share(this.listing);
  }

  async onRent(reservationDetails: ReservationRequest) {
    try {
      const checkoutSession = await this.listingService.reserve(reservationDetails);
      const sessionURL = new URL(checkoutSession.sessionUrl);
      if (sessionURL.hostname === 'localhost' && window.location.hostname !== 'localhost') {
        // Fix for local testing on Codespaces
        sessionURL.hostname = window.location.hostname;
        sessionURL.port = '';
      }
      console.info('Redirecting to ' + sessionURL);
      window.location.href = sessionURL.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
