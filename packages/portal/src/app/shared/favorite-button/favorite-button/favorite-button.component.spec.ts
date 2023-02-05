import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FavoriteButtonComponent } from "./favorite-button.component";

describe("FavoriteButtonComponent", () => {
  let component: FavoriteButtonComponent;
  let fixture: ComponentFixture<FavoriteButtonComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(FavoriteButtonComponent, {
      set: {
        imports: [CommonModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(FavoriteButtonComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
