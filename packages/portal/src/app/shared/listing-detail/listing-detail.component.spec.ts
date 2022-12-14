import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListingDetailComponent } from "./listing-detail.component";

describe("ListingDetailComponent", () => {
  let component: ListingDetailComponent;
  let fixture: ComponentFixture<ListingDetailComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListingDetailComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
