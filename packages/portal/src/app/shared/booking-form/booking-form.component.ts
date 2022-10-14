import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";

import { Listing } from "src/typings";

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

  monthlyRentPrice = 1500.0;
  discount = 20.0;
  monthlyRentPriceWithDiscount = Math.max(0, this.monthlyRentPrice * (1 - this.discount / 100));

  fees = {
    cleaning: 50.0,
    service: 30.0,
    occupancy: 100.0,
  };

  rentingPeriod: FormGroup;
  guests: FormGroup;
  constructor() {
    this.rentingPeriod = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    this.guests = new FormGroup({
      adults: new FormControl<String>("0"),
    });
  }

  ngOnInit(): void {
    this.guests.setValue({
      adults: "0",
    });
  }

  total() {
    const { start, end } = this.rentingPeriod.value;
    if (!start || !end) {
      return 0;
    }
    const days = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
    return days * this.monthlyRentPriceWithDiscount + this.fees.cleaning + this.fees.service + this.fees.occupancy;
  }

  months() {
    const { start, end } = this.rentingPeriod.value;
    return (end - start) / (1000 * 60 * 60 * 24);
  }
}
