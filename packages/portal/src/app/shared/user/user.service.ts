import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";

export enum UserRole {
  Guest = "guest",
  Renter = "renter",
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
      user = await this.saveUserSession(user);
    }

    this.localStorageService.save("user", user);
    return user;
  }

  authenticatedUser(clientPrincipal: UserClientPrincipal): User {
    const isAdmin = clientPrincipal.userRoles.includes("admin");

    return {
      id: clientPrincipal.userId,
      name: clientPrincipal.userDetails,
      photo: "account_circle",
      role: isAdmin ? UserRole.Admin : UserRole.Renter,
      email: clientPrincipal.userDetails,
      address: "fake address",
      auth: {
        provider: clientPrincipal.identityProvider as AuthProvider,
        lastLogin: new Date().toISOString(),
      },
    };
  }

  guestUser(): User {
    return {
      id: "guest",
      name: "Guest",
      photo: "account_circle",
      role: UserRole.Guest
    };
  }

  async saveUserSession(user: User) {
    const response = await fetch("/api/users", { method: "POST", body: JSON.stringify(user) });
    const payload = await response.json();
    return payload;
  }
}
