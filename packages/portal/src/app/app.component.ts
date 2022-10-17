import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { AppModule } from "./app.module";
import { MainNavComponent } from "./shared/main-nav/main-nav.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, MainNavComponent, AppModule, MatToolbarModule],
})
export class AppComponent {}
