import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { InMemoryCache } from "@apollo/client/core";
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { environment } from "../environments/environment";
import { ROUTES } from "./app-routing";

const uri = () => {
  if (!environment.production && environment.isCodespaces) {
    return environment.strapiGraphQlUriInCodespace;
  }
  return environment.strapiGraphQlUriFallback;
};

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: uri(),
    }),
    cache: new InMemoryCache(),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    Apollo,
    provideRouter(ROUTES),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    provideAnimations(),
  ],
};
