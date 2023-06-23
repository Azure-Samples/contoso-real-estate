import { provideLocationMocks } from "@angular/common/testing";
import { Component, EnvironmentProviders, makeEnvironmentProviders, ValueProvider } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { of } from "rxjs";
import { UserRole, UserService } from "../user/user.service";
import { canActiveAuthGuard } from "./auth-guard.service";

@Component({
  standalone: true,
  template: "",
})
class DummyAuthenticationComponent {}

@Component({
  standalone: true,
  template: "",
})
class DummyProfileComponent {}

function provideUserTesting(options: { userRole: UserRole }): EnvironmentProviders {
  const guestUser: User = {
    id: "guest",
    name: "Guest",
    photo: "account_circle",
    role: UserRole.Guest,
  };
  const testUser: User = {
    id: "be092a414817ff761949e046f4adf169",
    name: "Test User",
    photo: "account_circle",
    role: options.userRole,
    email: "testuser@example.com",
    address: "fake address",
    auth: {
      provider: "github",
      lastLogin: new Date().toISOString(),
    },
  };
  const userServiceStub: Partial<UserService> = {
    user$: of(options.userRole === UserRole.Guest ? guestUser : testUser),
  };
  const userServiceTestingProvider: ValueProvider = {
    provide: UserService,
    useValue: userServiceStub,
  };

  return makeEnvironmentProviders([userServiceTestingProvider]);
}

async function setup(options: { userRole: UserRole }) {
  TestBed.configureTestingModule({
    providers: [
      provideUserTesting({ userRole: options.userRole }),
      provideRouter([
        {
          path: "me",
          canActivate: [canActiveAuthGuard],
          component: DummyProfileComponent,
        },
        {
          path: "auth/login",
          component: DummyAuthenticationComponent,
        },
      ]),
      provideLocationMocks(),
    ],
  });
  const harness = await RouterTestingHarness.create();

  return {
    harness,
  };
}

describe("canActiveAuthGuard", () => {
  it("accepts renters", async () => {
    const { harness } = await setup({ userRole: UserRole.Renter });

    await harness.navigateByUrl("/me", DummyProfileComponent);
  });

  it("accepts admins", async () => {
    const { harness } = await setup({ userRole: UserRole.Admin });

    await harness.navigateByUrl("/me", DummyProfileComponent);
  });

  it("rejects guests", async () => {
    const { harness } = await setup({ userRole: UserRole.Guest });

    await harness.navigateByUrl("/me", DummyAuthenticationComponent);
  });
});
