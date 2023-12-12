import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MainNavComponent } from "./shared/main-nav/main-nav.component";
import { CommonModule } from "@angular/common";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MainNavComponent, MatToolbarModule],
})
export class AppComponent {
  enableAiChat = environment.aiEnableChat;
}
