import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { UserService } from "./app/shared/user/user.service";

bootstrapApplication(AppComponent, appConfig).then(async app => {
  const userService = app.injector.get(UserService);
  await userService.fetchAndStoreUserSession();
  console.log("Application is ready!");
});
