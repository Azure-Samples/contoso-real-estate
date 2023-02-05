import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { ProfileComponent } from "./profile.component";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const route = { data: of({ user: { name: "foo bar" } }) } as any as ActivatedRoute;

  beforeEach(async () => {
    TestBed.overrideComponent(ProfileComponent, {
      set: {
        imports: [CommonModule, RouterTestingModule],
        providers: [provideNoopAnimations(), { provide: ActivatedRoute, useValue: route }],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(ProfileComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
