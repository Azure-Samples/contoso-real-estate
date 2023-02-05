import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.scss"],
  standalone: true,
  imports: [RouterModule, CardComponent, CommonModule],
})
export class CardListComponent {
  @Input() listings: Listing[] = [];
  @Input() user: User = {} as User;

  @Output() scroll: EventEmitter<void> = new EventEmitter();
  noresults = "There are no listings right now. Come back again soon!";

}
