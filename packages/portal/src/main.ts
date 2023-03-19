import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app/app-routing";
import { AppComponent } from "./app/app.component";
import { UserService } from "./app/shared/user/user.service";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

export const IS_DEV_MODE = !environment.production;

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(ROUTES)), provideAnimations()],
}).then(async app => {
  const userService = app.injector.get(UserService);
  await userService.fetchAndStoreUserSession();
  console.log("Application is ready!");
});
