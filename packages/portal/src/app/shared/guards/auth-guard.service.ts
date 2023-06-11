import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../authentication/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["/auth/login"], { queryParams: { redirectURL: state.url } });
    }

    return false;
  }
}
