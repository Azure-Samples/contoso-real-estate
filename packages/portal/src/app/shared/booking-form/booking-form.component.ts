import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatNativeDateModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class BookingFormComponent implements OnInit {
  @Input() listing: Listing | null = null;

  monthlyRentPrice = 0;
  monthlyRentPriceWithDiscount = 0;
  discount = 0;

  capacity: number[] = [];

  bookingForm: FormGroup;
  rentingPeriod: FormGroup;
  guests: FormControl;
  currency = { code: "USD", symbol: "$" };

  capacityMapping: { [k: string]: string } = { "=1": "One guest", other: "# guests" };
  monthsMapping: { [k: string]: string } = { "=0": "0 month", "=1": "1 month", other: "# months" };

  @Output() onRent: EventEmitter<ReservationRequest>;

  constructor() {
    this.rentingPeriod = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    this.guests = new FormControl<number>(1);

    this.bookingForm = new FormGroup({
      rentingPeriod: this.rentingPeriod,
      guests: this.guests
    });

    this.onRent = new EventEmitter<ReservationRequest>();
  }

  ngOnInit(): void {
    this.guests.setValue(1);
  }

  ngOnChanges() {
    if (!this.listing) {
      return;
    }

    this.monthlyRentPrice = this.listing?.fees.rent || 0;
    this.monthlyRentPriceWithDiscount = Math.max(
      0,
      this.monthlyRentPrice * (1 - (this.listing?.fees?.discount || 0) / 100),
    );
    this.currency = this.listing?.fees?.currency;
    this.discount = this.listing?.fees?.discount || 0;
    this.capacity = Array(this.listing?.capacity)
      .fill(0)
      .map((x, i) => i + 1);
  }

  total() {
    const months = this.months();
    return (
      months * this.monthlyRentPriceWithDiscount +
      (this.listing?.fees?.cleaning || 0) +
      (this.listing?.fees?.service || 0) +
      (this.listing?.fees?.occupancy || 0)
    );
  }

  months() {
    const { start, end } = this.rentingPeriod.value;
    if (!start || !end) {
      return 0;
    }
    const days = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
    return +(days / 30).toFixed(2);
  }

  rent() {
    this.onRent.emit({
      // TODO: set userId properly
      userId: "123",
      listingId: this.listing?.id,
      guests: this.guests.value,
      from: this.fixAngularDateRangerPicker(this.rentingPeriod.value.start),
      to: this.fixAngularDateRangerPicker(this.rentingPeriod.value.end),
    });
  }

  private fixAngularDateRangerPicker(date: string) {
    return new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString();
  }

  startFromTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
}
