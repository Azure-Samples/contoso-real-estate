import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { ROUTES } from "./app-routing";
import { provideApollo } from "./core/apollo/provide-apollo";

export const appConfig: ApplicationConfig = {
  providers: [
    provideApollo(),
    provideRouter(ROUTES),
    provideHttpClient(),
    provideAnimations(),
  ],
};
