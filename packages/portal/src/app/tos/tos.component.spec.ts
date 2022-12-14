import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TosComponent } from "./tos.component";

describe("TosComponent", () => {
  let component: TosComponent;
  let fixture: ComponentFixture<TosComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TosComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
