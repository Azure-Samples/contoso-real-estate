import { Component, NgZone } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InfiniteScrollingDirective } from "./infinite-scrolling.directive";

@Component({
  standalone: true,
  template: `<span appInfiniteScrolling></span>`,
})
class TestComponent {}

describe("InfiniteScrollingDirective", () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
  });

  it("should create an instance", () => {
    const directive = new InfiniteScrollingDirective(fixture, new NgZone({}));
    expect(directive).toBeTruthy();
  });
});
