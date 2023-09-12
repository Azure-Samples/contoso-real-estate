import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule],
})
export class CheckoutpageComponent implements OnInit {
  @Input() result = 'error';
  @Input() reservationId = '';
  
  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    if (this.reservationId && this.result === 'cancel') {
      this.reservationService.cancelReservation(this.reservationId);
    }
  }

}
