import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { Listing } from "src/typings/";
import { BookingFormComponent } from "../shared/booking-form/booking-form.component";
import { ListingDetailComponent } from "../shared/listing-detail/listing-detail.component";
import { ListingService } from "../shared/listing.service";

@Component({
  selector: "app-rentalpage",
  templateUrl: "./rentalpage.component.html",
  styleUrls: ["./rentalpage.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ListingDetailComponent,
    BookingFormComponent
  ],
})
export class RentalpageComponent implements OnInit {
  listing!: Listing;
  navigation: Navigation | null;

  constructor(private router: Router, private route: ActivatedRoute, private listingService: ListingService) {
    this.navigation = this.router.getCurrentNavigation();
    this.listing = this.navigation?.extras.state?.["listing"] || null;
  }

  async ngOnInit() {
    this.listing = await this.listingService.getListingBySlug(this.route.snapshot.params["slug"]);
  }
}
