import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { UserRole, UserService } from "../user/user.service";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatButtonModule],
})
export class MainNavComponent {
  navItems = [
    { name: "Home", route: "/home" },
    { name: "Profile", route: "/me" },
    { name: "Favorites", route: "/me/favorites" },
    { name: "Payments", route: "/me/payments" },
    { name: "Reservations", route: "/me/reservations" },
  ];

  user = signal<User | null>(null);

  private userService = inject(UserService);

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user.set(user);
    });
  }

  isAuthenticated() {
    return this.user()?.role === UserRole.Renter || this.user()?.role === UserRole.Admin;
  }
}
