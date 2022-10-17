import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { CardListComponent } from "../shared/card-list/card-list.component";
import { ListingService } from "../shared/listing.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
  standalone: true,
  imports: [CardListComponent, MatButtonModule, MatDividerModule],
})
export class HomepageComponent implements OnInit {
  listings: Listing[] = [];
  constructor(private listingService: ListingService) {}

  async ngOnInit() {
    this.listings = (await this.listingService.getListings()).filter((listing: Listing) => listing.isFeatured);
  }

  async onBookmarkToggle(listing: Listing) {
    await this.listingService.bookmark(listing);
  }
}
