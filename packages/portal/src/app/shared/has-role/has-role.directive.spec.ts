import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HasRoleDirective } from "./has-role.directive";

@Component({
  standalone: true,
  template: `<span *appHasRole></span>`,
  imports: [HasRoleDirective],
})
class TestComponent {
  @ViewChild(HasRoleDirective, { static: true }) hasRole!: HasRoleDirective;
}

describe("HasRoleDirective", () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
  });

  it("should create an instance", () => {
    const { hasRole } = fixture.componentInstance;
    expect(hasRole).toBeDefined();
  });
});
