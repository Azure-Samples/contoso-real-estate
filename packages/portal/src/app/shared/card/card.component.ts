import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
})
export class CardComponent implements OnInit {
  @Input() listing!: Listing;

  monthlyRentPriceWithDiscount = 0;

  @Output() onBookmark: EventEmitter<Listing>;

  isBookmarked = false;

  constructor() {
    this.onBookmark = new EventEmitter<Listing>();
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.monthlyRentPriceWithDiscount = Math.max(0, this.listing.fees.rent * (1 - this.listing.fees.discount / 100));
  }

  bookmark() {
    this.listing.isFavorited = !this.listing.isFavorited;
    this.onBookmark.emit(this.listing);
  }
}
