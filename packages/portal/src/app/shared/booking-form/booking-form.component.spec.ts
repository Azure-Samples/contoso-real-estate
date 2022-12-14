import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BookingFormComponent } from "./booking-form.component";

describe("BookingFormComponent", () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(BookingFormComponent, {
      set: {
        imports: [CommonModule, RouterTestingModule],
        providers: [provideNoopAnimations()],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(BookingFormComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
