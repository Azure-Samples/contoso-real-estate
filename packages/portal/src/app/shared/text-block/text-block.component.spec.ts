import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextBlockComponent } from "./text-block.component";

describe("TextComponent", () => {
  let component: TextBlockComponent;
  let fixture: ComponentFixture<TextBlockComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TextBlockComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
