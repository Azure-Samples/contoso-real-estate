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

  pricePerNight = 500.0;
  discount = 20.0;
  pricePerNightWithDiscount = Math.max(0, this.pricePerNight * (1 - this.discount / 100));

  fees = {
    cleaning: 50.0,
    service: 30.0,
    occupancy: 100.0,
  };

  guests = {
    adults: 1,
    children: 0,
  };

  checkInCheckOut: FormGroup;
  constructor() {
    this.checkInCheckOut = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {}

  total() {
    const { start, end } = this.checkInCheckOut.value;
    if (!start || !end) {
      return 0;
    }
    const days = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
    return days * this.pricePerNightWithDiscount + this.fees.cleaning + this.fees.service + this.fees.occupancy;
  }

  nights() {
    const { start, end } = this.checkInCheckOut.value;
    return (end - start) / (1000 * 60 * 60 * 24);
  }

}
