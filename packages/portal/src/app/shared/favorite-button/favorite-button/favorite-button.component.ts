import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FavoriteService } from "../../favorite.service";
import { UserService } from "../../user/user.service";

@Component({
  selector: "app-favorite-button",
  templateUrl: "./favorite-button.component.html",
  styleUrls: ["./favorite-button.component.scss"],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class FavoriteButtonComponent implements OnChanges {
  @Input() listing!: Listing | null;
  isOperationLoading = false;
  user: User | null = null;

  constructor(private favoriteService: FavoriteService, private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  async ngOnChanges() {
    if (this.listing && this.user) {
      this.listing.$$isFavorited = await this.favoriteService.getFavorite(this.listing, this.user);
    }
  }

  async bookmark() {
    if (this.listing && this.user) {
      this.isOperationLoading = true;

      if (this.listing.$$isFavorited) {
        const isOperationSucceeded = await this.favoriteService.removeFavorite(this.listing, this.user);
        if (isOperationSucceeded) {
          this.listing.$$isFavorited = false;
        }
      } else {
        const isOperationSucceeded = await this.favoriteService.addFavorite(this.listing, this.user);
        if (isOperationSucceeded) {
          this.listing.$$isFavorited = true;
        }
      }

      this.isOperationLoading = false;
    }
  }
}
