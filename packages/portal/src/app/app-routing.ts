import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuard } from "./shared/guards/auth-guard.service";

export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomepageComponent,
  },
  {
    path: "listing/:id/:slug",
    loadComponent: () => import("./rentalpage/rentalpage.component").then(m => m.RentalpageComponent),
  },
  {
    path: "checkout",
    loadComponent: () => import("./checkoutpage/checkoutpage.component").then(m => m.CheckoutpageComponent),
  },
  {
    path: "tos",
    loadComponent: () => import("./tos/tos.component").then(m => m.TosComponent),
  },
  {
    path: "about",
    loadComponent: () => import("./about/about.component").then(m => m.AboutComponent),
  },
  {
    path: "me",
    canActivate:[AuthGuard],
    loadComponent: () => import("./profile/profile.component").then(m => m.ProfileComponent),
  },
  {
    path: "auth/login",
    loadComponent: () => import("./authentication/authentication.component").then(m => m.AuthenticationComponent),
  },
  {
    path: "auth/logout",
    loadComponent: () => import("./authentication/authentication.component").then(m => m.AuthenticationComponent),
  },
  {
    path: "**",
    loadComponent: () => import("./shared/errors/not-found/not-found.component").then(m => m.NotFoundComponent),
  }
];
