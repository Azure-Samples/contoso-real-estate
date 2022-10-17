import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
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

  fees = {
    cleaning: 0,
    service: 0,
    occupancy: 0,
    discount: 0,
  };

  rentingPeriod: FormGroup;
  guests: FormGroup;

  @Output() onRent: EventEmitter<Reservation>;

  constructor() {
    this.rentingPeriod = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    this.guests = new FormGroup({
      adults: new FormControl<String>("0"),
    });

    this.onRent = new EventEmitter<Reservation>();
  }

  ngOnInit(): void {
    this.guests.setValue({
      adults: "0",
    });
  }

  ngOnChanges() {
    this.fees = {
      cleaning: this.listing?.fees.cleaning || 0,
      service: this.listing?.fees.service || 0,
      occupancy: this.listing?.fees.occupancy || 0,
      discount: this.listing?.fees.discount || 0,
    };

    this.monthlyRentPrice = this.listing?.fees.rent || 0;
    this.monthlyRentPriceWithDiscount = Math.max(0, this.monthlyRentPrice * (1 - this.fees.discount / 100));

  }

  total() {
    const months = this.months();
    return months * this.monthlyRentPriceWithDiscount + this.fees.cleaning + this.fees.service + this.fees.occupancy;
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
      listing: this.listing,
      guests: this.guests.value,
      rentingPeriod: this.rentingPeriod.value,
      total: this.total(),
    } as Reservation);
  }
}
