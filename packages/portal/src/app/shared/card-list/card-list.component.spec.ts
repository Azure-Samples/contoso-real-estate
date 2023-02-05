import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardListComponent } from "./card-list.component";

describe("CardListComponent", () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(CardListComponent, {
      set: {
        imports: [CommonModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(CardListComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
