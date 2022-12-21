import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CardListComponent } from "./card-list.component";

describe("CardListComponent", () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CardListComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
