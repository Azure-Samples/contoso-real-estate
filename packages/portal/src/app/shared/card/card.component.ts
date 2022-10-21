import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
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
export class CardComponent implements OnInit, OnChanges {
  @Input() listing!: Listing;

  monthlyRentPriceWithDiscount = 0;

  @Output() onFavorited: EventEmitter<Listing>;

  isBookmarked = false;

  bedroomsMapping: { [k: string]: string } = { "=1": "1 bedroom", other: "# bedrooms" };
  bathroomsMapping: { [k: string]: string } = { "=1": "1 bathroom", other: "# bathrooms" };

  constructor() {
    this.onFavorited = new EventEmitter<Listing>();
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.monthlyRentPriceWithDiscount = Math.max(0, this.listing.fees.rent * (1 - this.listing.fees.discount / 100));
  }

  bookmark() {
    this.onFavorited.emit(this.listing);
  }
}
