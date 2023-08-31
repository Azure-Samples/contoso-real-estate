import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FavoriteService } from "../../favorite.service";
import { UserService } from "../../user/user.service";
import { Subject, of, Subscription ,debounceTime ,switchMap } from 'rxjs';

@Component({
  selector: "app-favorite-button",
  templateUrl: "./favorite-button.component.html",
  styleUrls: ["./favorite-button.component.scss"],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})

export class FavoriteButtonComponent implements OnChanges {
  @Input() listing!: Listing | null;
  isOperationLoading = signal(false);
  user: User | null = null;

  private changes$ = new Subject<void>();
  private changesSubscription: Subscription;
  private favoriteService = inject(FavoriteService);
  private userService = inject(UserService);

  constructor() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.changesSubscription = this.changes$
      .pipe(
        debounceTime(200),
        switchMap(async () => {
          if (this.listing && this.user) {
            return this.favoriteService.getFavorite(this.listing, this.user);
          }
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result !== null && this.listing) {
          this.listing.$$isFavorited = result;
        }
      });
  }

  ngOnChanges() {
    this.changes$.next();
  }
  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
  }
  async bookmark() {
    if (this.listing && this.user) {
      this.isOperationLoading.set(true);

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
      this.isOperationLoading.set(false);
    }
  }
}
