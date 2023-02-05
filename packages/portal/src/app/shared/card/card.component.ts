import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { FavoriteButtonComponent } from "../favorite-button/favorite-button/favorite-button.component";
import { HasRoleDirective } from "../has-role/has-role.directive";
import { UserRole } from "../user/user.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule, HasRoleDirective, FavoriteButtonComponent],
})
export class CardComponent implements OnChanges {
  @Input() listing!: Listing | null;
  @Input() user!: User | null;
  userRole: typeof UserRole = UserRole;
  monthlyRentPriceWithDiscount = 0;
  isOperationLoading = false;
  bedroomsMapping: { [k: string]: string } = { "=1": "1 bedroom", other: "# bedrooms" };
  bathroomsMapping: { [k: string]: string } = { "=1": "1 bathroom", other: "# bathrooms" };

  async ngOnChanges() {
    if (this.listing) {
      const discount = parseInt(this.listing.fees[3], 10) * (1 - parseInt(this.listing.fees[4], 10) / 100);
      this.monthlyRentPriceWithDiscount = Math.max(0, discount);
    }
  }
}
