import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FavoriteService } from "../shared/favorite.service";
import { ListingService } from "../shared/listing.service";
import { PaymentService } from "../shared/payment.service";
import { ReservationService } from "../shared/reservation.service";
import { UserService } from "../shared/user/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatTabsModule],
})
export class ProfileComponent implements OnInit {
  user = signal<User>({} as User);
  listings = signal<Listing[]>([]);
  reservations = signal<Reservation[]>([]);
  payments = signal<Payment[]>([]);
  selectedTabIndex = signal<number>(0);

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private favoriteService = inject(FavoriteService);
  private reservationService = inject(ReservationService);
  private paymentService = inject(PaymentService);
  private listingService = inject(ListingService);
  private router = inject(Router);

  constructor() {
    this.userService.user$.subscribe(user => {
      this.user.set(user);
    });
  }

  async ngOnInit() {
    this.route.data.subscribe(async data => {
      this.user.set(data["user"]);
      await this.listFavorites();
      await this.listReservations();
      await this.listPayments();
    });

    const tabs = ["favorites", "payments", "reservations"];

    this.route.paramMap.subscribe(async params => {
      const tab = params.get("tab");
      this.selectedTabIndex.set(tabs.indexOf(tab || "favorites"));
    });
  }

  async listFavorites() {
    // this call allows us to get the count of favorites
    this.listings.set(await this.favoriteService.countFavoritesByUser(this.user()));

    // this call allows us to get the actual listings
    this.listings.set(await this.favoriteService.getFavoritesByUser(this.user()));
  }

  async removeFavorite(listing: Listing) {
    // remove the listing from the UI
    this.listings.update(listings => listings.filter(l => l.id !== listing.id));

    // remove the favorite from the database
    await this.favoriteService.removeFavorite(listing, this.user());
  }

  async listReservations() {
    this.reservations.set(await this.reservationService.getReservationsByUser(this.user()));
  }

  async listPayments() {
    this.payments.set(await this.paymentService.getPaymentsByUser(this.user()));
  }

  async viewListing(listingId: string) {
    const listing = await this.listingService.getListingById(listingId);
    if (!listing) {
      return;
    }
    this.router.navigate([`/listing/${listing.id}/${listing.slug}`], { state: { listing } } );
  }

  trackByReservationId(_index: number, reservation: Reservation) {
    return reservation.id;
  }

  trackByPaymentId(_index: number, payment: Payment) {
    return payment.id;
  }

  showAmount(amount: number) {
    return (amount / 100).toFixed(2);
  }
}
