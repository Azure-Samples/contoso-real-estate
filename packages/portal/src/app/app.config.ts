import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { ROUTES } from "./app-routing";
import { provideApollo } from "./core/apollo/provide-apollo";
import { provideUser } from "./core/user/provide-user";

export const appConfig: ApplicationConfig = {
  providers: [
    provideApollo(),
    provideRouter(ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideUser(),
  ],
};
