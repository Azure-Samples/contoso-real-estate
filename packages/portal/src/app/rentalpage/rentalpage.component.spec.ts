import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RentalpageComponent } from "./rentalpage.component";

describe("RentalpageComponent", () => {
  let component: RentalpageComponent;
  let fixture: ComponentFixture<RentalpageComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(RentalpageComponent, {
      set: {
        imports: [RouterTestingModule],
        schemas: [NO_ERRORS_SCHEMA],
      }
    });
    fixture = TestBed.createComponent(RentalpageComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
