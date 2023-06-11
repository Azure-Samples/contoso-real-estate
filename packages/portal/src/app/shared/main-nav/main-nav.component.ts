import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { RouterModule } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
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

  user: User | null = null;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  isAuthenticated() {
    return this.user?.role === UserRole.Renter || this.user?.role === UserRole.Admin;
  }
}
