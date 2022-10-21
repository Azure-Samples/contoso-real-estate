import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
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
export class CardListComponent implements OnInit, OnChanges {
  @Input() listings: Listing[] = [];

  @Output() onFavoritedToggle: EventEmitter<Listing>;
  noresults: string = "There are no listings right now. Come back again soon!";

  constructor(private favoriteService: FavoriteService, private userService: UserService) {
    this.onFavoritedToggle = new EventEmitter<Listing>();
  }

  ngOnInit() {}

  ngOnChanges() {
    this.listings.map(async listing => {
      listing.$$isFavorited = await this.favoriteService.getFavorite(listing, this.userService.currentUser());
      return listing;
    });

    console.log(this.listings);
  }

  onFavorited(listing: Listing) {
    this.onFavoritedToggle.emit(listing);
  }
}
