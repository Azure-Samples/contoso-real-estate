import { Injectable } from "@angular/core";
import { UserRole, UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User | null = null;

  isLoggedIn = false;
  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  isAuthenticated() {
    return this.user?._id === this.userService.currentUser()._id;
  }

  hasRole(roles: UserRole[]) {
    if (!this.user) {
      return false;
    }

    return roles.includes(this.user.role as UserRole);
  }
}
