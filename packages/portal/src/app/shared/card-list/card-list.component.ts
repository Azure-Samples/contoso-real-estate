import { Component } from "@angular/core";
import { Listing } from "../../../typings";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { CommonModule } from "@angular/common";
import { ListingService } from "../listing.service";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.scss"],
  standalone: true,
  imports: [RouterModule, CardComponent, CommonModule],
})
export class CardListComponent {
  listings: Listing[] = [];
  noresults: string = "There are no listings right now. Come back again soon!";

  constructor(private listingService: ListingService) {}

  async ngOnInit() {
    this.listings = await this.listingService.getListings();
  }
}
