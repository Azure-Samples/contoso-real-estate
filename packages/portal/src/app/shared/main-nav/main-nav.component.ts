import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
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
    { name: "Profile", route: "/me" },
    { name: "Payments", route: "/me/payments" },
    { name: "Favorites", route: "/me/favorites" },
    { name: "Reservations", route: "/me/reservations" },
  ];

  userDetails: User | null = null;

  constructor(private authService: AuthService, private userService: UserService) {}

  async ngOnInit() {
    this.userDetails = await this.userService.currentUser();
  }

  isAuthenticated() {
    return this.userDetails?.role === UserRole.User || this.userDetails?.role === UserRole.Admin;
  }
}
