import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";

export enum UserRole {
  Guest = "guest",
  User = "user",
  Admin = "admin",
}

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private localStorageService: LocalStorageService) {}

  async currentUser() {
    const response = await fetch("/.auth/me");
    const payload = await response.json();
    const { clientPrincipal }: { clientPrincipal: UserClientPrincipal } = payload;
    let user = this.guestUser();

    if (clientPrincipal) {
      user = this.authenticatedUser(clientPrincipal);
    }

    this.localStorageService.save("user", user);
    return user;
  }

  authenticatedUser(clientPrincipal: UserClientPrincipal): User {

    const isAdmin = clientPrincipal.userRoles.includes("admin");

    return {
      id: clientPrincipal.userId,
      name: clientPrincipal.userDetails,
      avatar: "account_circle",
      role: isAdmin ? UserRole.Admin : UserRole.User,
    };
  }

  guestUser(): User {
    return {
      id: "guest",
      name: "Guest",
      avatar: "account_circle",
      role: UserRole.Guest,
    };
  }
}
