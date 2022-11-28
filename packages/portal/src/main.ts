import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app/app-routing";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// migrate to standalone components
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(ROUTES)), provideAnimations()],
});
