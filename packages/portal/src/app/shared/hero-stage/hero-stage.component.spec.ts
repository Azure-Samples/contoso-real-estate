import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroStageComponent } from "./hero-stage.component";

describe("HeroStageComponent", () => {
  let component: HeroStageComponent;
  let fixture: ComponentFixture<HeroStageComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HeroStageComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
