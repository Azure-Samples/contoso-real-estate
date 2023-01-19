import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatButtonModule],
})
export class MainNavComponent {
  navItems = [
    { name: "Profile", route: "/me", authenticated: true },
    { name: "Payments", route: "/me/payments", authenticated: true },
    { name: "Favorites", route: "/me/favorites", authenticated: true },
    { name: "Reservations", route: "/me/reservations", authenticated: true },
    { name: "Login", route: "/auth/login", authenticated: false },
    { name: "Logout", route: "/auth/logout", authenticated: true },
  ];
}
