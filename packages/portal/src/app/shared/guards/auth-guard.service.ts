import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../authentication/auth.service";

export const canActiveAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isAuthenticated();
  if (isLoggedIn) {
    return true;
  } 
  router.navigate(["/auth/login"], {queryParams: {redirectURL: state.url}});
  return false;
}
