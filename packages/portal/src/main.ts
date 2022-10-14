import { enableProdMode, importProvidersFrom } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { ROUTES } from "./app/app-routing";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { RouterModule } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

if (environment.production) {
  enableProdMode();
}

// migrate to standalone components
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(ROUTES)), provideAnimations()],
});
