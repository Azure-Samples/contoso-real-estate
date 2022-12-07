import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { FavoriteService } from "../favorite.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.scss"],
  standalone: true,
  imports: [RouterModule, CardComponent, CommonModule],
})
export class CardListComponent implements OnChanges {
  @Input() listings: Listing[] = [];

  @Output() onFavoritedToggle: EventEmitter<Listing>;
  @Output() scroll: EventEmitter<void> = new EventEmitter();
  noresults = "There are no listings right now. Come back again soon!";

  constructor(private favoriteService: FavoriteService, private userService: UserService) {
    this.onFavoritedToggle = new EventEmitter<Listing>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["listings"].currentValue !== changes["listings"].previousValue) {
      this.listings.map(async listing => {
        listing.$$isFavorited = await this.favoriteService.getFavorite(listing, this.userService.currentUser());
        return listing;
      });
    }
  }

  onFavorited(listing: Listing) {
    this.onFavoritedToggle.emit(listing);
  }
}
