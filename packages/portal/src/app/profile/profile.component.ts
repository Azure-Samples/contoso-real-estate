import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { Router, RouterModule } from "@angular/router";
import { FavoriteService } from "../shared/favorite.service";
import { ListingService } from "../shared/listing.service";
import { PaymentService } from "../shared/payment.service";
import { ReservationService } from "../shared/reservation.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatTabsModule],
})
export class ProfileComponent implements OnInit {
  @Input() user: User = {} as User;
  @Input('tab') selectedTab = 'favorites';

  readonly tabs = ["favorites", "payments", "reservations"];

  listings = signal<Listing[]>([]);
  reservations = signal<Reservation[]>([]);
  payments = signal<Payment[]>([]);

  get selectedTabIndex() {
    return this.tabs.indexOf(this.selectedTab || "favorites")
  };

  private favoriteService = inject(FavoriteService);
  private reservationService = inject(ReservationService);
  private paymentService = inject(PaymentService);
  private listingService = inject(ListingService);
  private router = inject(Router);

  async ngOnInit() {
    await this.listFavorites();
    await this.listReservations();
    await this.listPayments();
  }

  async listFavorites() {
    // this call allows us to get the count of favorites
    this.listings.set(await this.favoriteService.countFavoritesByUser(this.user));

    // this call allows us to get the actual listings
    this.listings.set(await this.favoriteService.getFavoritesByUser(this.user));
  }

  async removeFavorite(listing: Listing) {
    // remove the listing from the UI
    this.listings.update(listings => listings.filter(l => l.id !== listing.id));

    // remove the favorite from the database
    await this.favoriteService.removeFavorite(listing, this.user);
  }

  async listReservations() {
    this.reservations.set(await this.reservationService.getReservationsByUser(this.user));
  }

  async listPayments() {
    this.payments.set(await this.paymentService.getPaymentsByUser(this.user));
  }

  async viewListing(listingId: string) {
    const listing = await this.listingService.getListingById(listingId);
    if (!listing) {
      return;
    }
    this.router.navigate([`/listing/${listing.id}/${listing.slug}`], { state: { listing } });
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
