import { Injectable, inject } from "@angular/core";
import { Resolve } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../local-storage/local-storage.service";

export enum UserRole {
  Guest = "guest",
  Renter = "renter",
  Admin = "admin",
}

@Injectable({
  providedIn: "root",
})
export class UserService implements Resolve<User> {
  private readonly userSource = new BehaviorSubject<User>(this.guestUser());
  readonly user$ = this.userSource.asObservable();

  private localStorageService = inject(LocalStorageService);

  async resolve(): Promise<User> {
    return await this.currentUser();
  }

  async fetchAndStoreUserSession() {
    let user = await this.loadUserSession();
    if (user.role !== UserRole.Guest) {
      user = await this.saveUserSession(user);
    }
    return user;
  }

  async loadUserSession() {
    const response = await fetch("/.auth/me");
    const payload = await response.json();
    const { clientPrincipal }: { clientPrincipal: UserClientPrincipal } = payload;
    let user = this.guestUser();

    if (clientPrincipal) {
      user = this.authenticatedUser(clientPrincipal);
    }

    this.localStorageService.save("user", user);

    this.userSource.next(user);
    return user;
  }

  async currentUser() {
    const user = await this.loadUserSession();
    this.userSource.next(user);

    return this.userSource.getValue();
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
      role: UserRole.Guest,
    };
  }

  async saveUserSession(user: User) {
    const response = await fetch("/api/users", { method: "POST", body: JSON.stringify(user) });
    const payload = await response.json();

    if (response.status !== 200) {
      // report error but don't block navigation
      console.error("User session not saved", payload.error);
      return user;
    }

    return payload;
  }
}
