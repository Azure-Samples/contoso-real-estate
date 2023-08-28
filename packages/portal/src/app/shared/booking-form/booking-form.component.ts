import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { HasRoleDirective } from "../has-role/has-role.directive";
import { UserRole, UserService } from "../user/user.service";

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
    HasRoleDirective,
  ],
})
export class BookingFormComponent implements OnInit {
  @Input() listing: Listing | null = null;
  @Output() onRent: EventEmitter<ReservationRequest>;
  userRole: typeof UserRole = UserRole;

  bookingForm: FormGroup;
  rentingPeriod: FormGroup;
  guests: FormControl;
  currency_code = "USD";

  capacityMapping: { [k: string]: string } = { "=1": "One guest", other: "# guests" };
  monthsMapping: { [k: string]: string } = { "=0": "0 month", "=1": "1 month", other: "# months" };

  isGuest = signal(false);
  monthlyRentPrice = signal(0);
  monthlyRentPriceWithDiscount = signal(0);
  discount = signal(0);
  capacity = signal<number[]>([]);
  currency_symbol = signal("$");

  private authService = inject(AuthService);
  private userService = inject(UserService);

  constructor() {

    this.isGuest.set(this.authService.hasRole([UserRole.Guest]));

    const differentThanStartDateValidator = (): ValidatorFn => {
      return (control: AbstractControl): ValidationErrors | null => {
        const startDate = new Date(this.rentingPeriod?.value.start).getTime();
        const endDate = new Date(control.value).getTime();
        const sameDate = startDate === endDate;
        return sameDate ? { sameDate: { value: control.value } } : null;
      };
    }

    this.rentingPeriod = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null, [differentThanStartDateValidator()]),
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

    const rentPriceWithDiscount = (Number(this.listing?.fees?.[3]) || 0) * (1 - (parseInt(this.listing?.fees?.[4], 10) || 0) / 100);
    this.monthlyRentPrice.set(Number(this.listing?.fees?.[3]) || 0);
    this.monthlyRentPriceWithDiscount.set(Math.max(0, rentPriceWithDiscount));
    this.currency_code = this.listing?.fees?.[5].substring(0, 3);
    this.currency_symbol.set(this.listing?.fees?.[5].substring(4));
    this.discount.set(Number(this.listing?.fees?.[4]) || 0);
    this.capacity.set(Array(this.listing?.capacity)
      .fill(0)
      .map((x, i) => i + 1));
  }

  total() {
    const months = this.months();
    return (
      months * this.monthlyRentPriceWithDiscount() +
      (Number(this.listing?.fees?.[0]) || 0) +
      (Number(this.listing?.fees?.[1]) || 0) +
      (Number(this.listing?.fees?.[2]) || 0)
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

  async rent() {
    if (!this.isGuest()) {
      const user = await this.userService.currentUser();
      this.onRent.emit({
        userId: user.id,
        listingId: this.listing?.id,
        guests: this.guests.value,
        from: this.localeDateToUTCDateString(this.rentingPeriod.value.start),
        to: this.localeDateToUTCDateString(this.rentingPeriod.value.end),
      });
    }
  }

  private localeDateToUTCDateString(dateStr: string) {
    const date = new Date(dateStr);
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return new Date(utc).toISOString();
  }

  startFromToday() {
    return new Date();
  }
}
