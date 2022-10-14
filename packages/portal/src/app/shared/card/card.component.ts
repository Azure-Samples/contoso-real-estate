import { Component, Input, OnInit } from "@angular/core";
import { Listing } from "src/typings/";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class CardComponent implements OnInit {
  @Input() listing!: Listing;

  monthlyRentPriceWithDiscount = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.monthlyRentPriceWithDiscount = Math.max(0, this.listing.fees.rent * (1 - this.listing.fees.discount / 100))
  }
}
