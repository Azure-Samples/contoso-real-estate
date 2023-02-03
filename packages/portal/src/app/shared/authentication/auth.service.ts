import { Injectable } from '@angular/core';
import { UserRole, UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;

  isLoggedIn = false;
  constructor(private userService: UserService) {
    this.userService.currentUser().then(user => {
      this.user = user;
      this.isLoggedIn = this.hasRole([UserRole.Renter, UserRole.Admin]);
    });
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  hasRole(roles: UserRole[]) {
    if (!this.user) {
      return false;
    }

    return roles.includes(this.user.role as UserRole);
  }
}
