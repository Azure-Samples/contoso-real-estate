import { Component, NgZone } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InfiniteScrollingDirective } from "./infinite-scrolling.directive";

@Component({
  standalone: true,
  template: `<i appInfiniteScrolling></i>`,
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
