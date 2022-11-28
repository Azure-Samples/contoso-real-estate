import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { BookingFormComponent } from "../shared/booking-form/booking-form.component";
import { ListingDetailComponent } from "../shared/listing-detail/listing-detail.component";
import { ListingService } from "../shared/listing.service";

@Component({
  selector: "app-rentalpage",
  templateUrl: "./rentalpage.component.html",
  styleUrls: ["./rentalpage.component.scss"],
  standalone: true,
  imports: [CommonModule, ListingDetailComponent, BookingFormComponent],
})
export class RentalpageComponent implements OnInit {
  listing!: Listing;
  navigation: Navigation | null;
  reviewStars: number[] = [];

  reviewsMapping: { [k: string]: string } = { "=0": "No reviews", "=1": "1 message", other: "# reviews" };

  constructor(private router: Router, private route: ActivatedRoute, private listingService: ListingService) {
    this.navigation = this.router.getCurrentNavigation();
    this.listing = this.navigation?.extras.state?.["listing"] || null;
  }

  async ngOnInit() {
    const listing = await this.listingService.getListingBySlug(this.route.snapshot.params["slug"]);

    if (listing !== undefined) {
      this.listing = listing;
    } else {
      // TODO: fallback to 404 page
      this.router.navigate(["/"]);
    }

    this.reviewStars = Array(5)
      .fill(0)
      .map((x, i) => (i < this.listing?.reviews.stars ? 1 : 0));
  }

  async bookmark() {
    this.listing.isFavorited = !this.listing.isFavorited;
    await this.listingService.bookmark(this.listing);
  }

  async share() {
    await this.listingService.share(this.listing);
  }

  async onRent(reservationDetails: ReservationRequest) {
    try {
      const checkoutSession = await this.listingService.reserve(reservationDetails);
      window.location.href = checkoutSession.sessionUrl;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // TODO: show error message in dialog
        alert(error.message);
      }
    }
  }
}
