import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app/app-routing";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app/app.component";
import { UserService } from "./app/shared/user/user.service";
import { environment } from "./environments/environment";
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:1337/graphql'; // <-- GraphQL Strapi endpoint
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri
    }),
    cache: new InMemoryCache(),
  };
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    Apollo,
    importProvidersFrom(
      RouterModule.forRoot(ROUTES),
      HttpClientModule,
    ),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    provideAnimations(),
  ],
}).then(async app => {
  const userService = app.injector.get(UserService);
  await userService.fetchAndStoreUserSession();
  console.log("Application is ready!");
});
