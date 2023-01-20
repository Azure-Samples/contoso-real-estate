import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
})
export class CardComponent implements OnChanges {
  @Input() listing!: Listing | null;
  @Output() onFavorited: EventEmitter<Listing | null>;
  monthlyRentPriceWithDiscount = 0;
  isBookmarked = false;
  bedroomsMapping: { [k: string]: string } = { "=1": "1 bedroom", other: "# bedrooms" };
  bathroomsMapping: { [k: string]: string } = { "=1": "1 bathroom", other: "# bathrooms" };

  constructor() {
    this.onFavorited = new EventEmitter<Listing | null>();
  }

  ngOnChanges() {
    if (this.listing) {
      this.monthlyRentPriceWithDiscount = Math.max(0, parseInt(this.listing.fees[3], 10) * (1 - parseInt(this.listing.fees[4], 10) / 100));
    }
  }

  bookmark() {
    this.onFavorited.emit(this.listing);
  }
}
