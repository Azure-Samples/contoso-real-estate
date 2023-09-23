import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject, signal } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
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
  imports: [CommonModule, ListingDetailComponent, BookingFormComponent, HasRoleDirective, FavoriteButtonComponent, MatMenuModule],
})
export class RentalpageComponent implements OnInit {
  userRole: typeof UserRole = UserRole;
  user: User;
  navigation: Navigation | null;
  reviewsMapping: { [k: string]: string } = { "=0": "No reviews", "=1": "1 message", other: "# reviews" };

  listing = signal<Listing>({} as Listing);
  reviewStars = signal<number[]>([]);
  isLoading = signal(true);

  private router = inject(Router);
  private listingService = inject(ListingService);
  private userService = inject(UserService);

  @Input('id') listId = '';

  constructor() {
    this.navigation = this.router.getCurrentNavigation();
    this.listing.set(this.navigation?.extras.state?.["listing"] || {});
    this.user = this.navigation?.extras.state?.["user"] || null;
  }

  async ngOnInit() {
    this.user = await this.userService.currentUser();
    if (this.user === null) {
      this.router.navigate(["/login"]);
      return;
    }

    const listing = await this.listingService.getListingById(this.listId);

    if (listing !== undefined) {
      this.listing.set(listing);
      this.isLoading.set(false);
    } else {
      this.router.navigate(["/404"]);
    }

    this.reviewStars.set(Array(5)
      .fill(0)
      .map((x, i) => (i < this.listing().reviews_stars ? 1 : 0)));
  }

  async share(platform: string) {
    await this.listingService.share(platform, this.listing());
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
