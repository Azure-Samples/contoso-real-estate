import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule],
})
export class CheckoutpageComponent implements OnInit {
  result = signal<CheckoutResult>('error');

  private route = inject(ActivatedRoute);
  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.result.set(this.route.snapshot.queryParams['result']);

    const reservationId = this.route.snapshot.queryParams['reservationId'];
    if (reservationId && this.result() === 'cancel') {
      this.reservationService.cancelReservation(reservationId);
    }
  }

}
