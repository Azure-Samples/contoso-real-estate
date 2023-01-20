import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { FavoriteService } from "../favorite.service";
import { UserService } from "../user/user.service";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.scss"],
  standalone: true,
  imports: [RouterModule, CardComponent, CommonModule],
})
export class CardListComponent implements OnChanges {
  @Input() listings: Listing[] = [];
  @Input() user: User = {} as User;

  @Output() onFavoritedToggle: EventEmitter<Listing | null>;
  @Output() scroll: EventEmitter<void> = new EventEmitter();
  noresults = "There are no listings right now. Come back again soon!";

  constructor(private favoriteService: FavoriteService) {
    this.onFavoritedToggle = new EventEmitter<Listing | null>();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes["listings"]?.currentValue !== changes["listings"]?.previousValue) {
      this.listings.map(async listing => {
        listing.$$isFavorited = await this.favoriteService.getFavorite(listing, this.user);
        return listing;
      });
    }
  }

  onFavorited(listing: Listing | null) {
    this.onFavoritedToggle.emit(listing);
  }
}
