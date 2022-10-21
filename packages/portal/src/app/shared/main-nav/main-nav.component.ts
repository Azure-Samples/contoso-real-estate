import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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
export class MainNavComponent implements OnInit {


  navItems = [
    { name: "Profile", route: "/me", authenticated: true },
    { name: "Payments", route: "/me/payments", authenticated: true },
    { name: "Favorites", route: "/me/favorites", authenticated: true },
    { name: "Reservations", route: "/me/reservations", authenticated: true },
    { name: "Logout", route: "/me/auth/logout", authenticated: true },
    { name: "Login", route: "/me/auth/login", authenticated: false },
  ];

  constructor() {}

  ngOnInit(): void {}
}
