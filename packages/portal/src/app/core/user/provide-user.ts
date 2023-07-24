import { APP_INITIALIZER, EnvironmentProviders, FactoryProvider, makeEnvironmentProviders } from "@angular/core";
import { UserService } from "../../shared/user/user.service";

function createInitializeUser(userService: UserService): () => Promise<User> {
  return () => userService.fetchAndStoreUserSession();
}

export function provideUser(): EnvironmentProviders {
  const userInitializerProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: createInitializeUser,
    deps: [UserService],
    multi: true,
  };

  return makeEnvironmentProviders([userInitializerProvider]);
}
