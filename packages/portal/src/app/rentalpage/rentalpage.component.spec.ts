import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { RentalpageComponent } from "./rentalpage.component";

const mockRouter = {
  getCurrentNavigation: jest.fn().mockReturnValue({
    extras: {
      state: {
        listing: {
          id: "123",
          name: "foo",
          description: "bar",
          photos: ["baz", "qux"],
          address: ["quux", "quuz", "corge"],
        },
        user: {
          id: "456",
          name: "baz",
        },
      },
    },
  }),
};

describe("RentalpageComponent", () => {
  let component: RentalpageComponent;
  let fixture: ComponentFixture<RentalpageComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(RentalpageComponent, {
      set: {
        imports: [RouterTestingModule, CommonModule],
        providers: [{ provide: Router, useValue: mockRouter }],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(RentalpageComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
