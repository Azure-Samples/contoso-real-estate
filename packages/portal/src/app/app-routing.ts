import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuard } from "./shared/guards/auth-guard.service";
import { UserService } from "./shared/user/user.service";

export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "search",
    pathMatch: "full",
    loadComponent: () => import("./searchpage/searchpage.component").then(m => m.SearchpageComponent),
  },
  {
    resolve: {
      user: UserService,
    },
    path: "home",
    component: HomepageComponent,
  },
  {
    resolve: {
      user: UserService,
    },
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
    matcher: url => {
      if (url.length === 1 && url[0].path === "me") {
        return { consumed: url, posParams: { tab: url[0] } };
      }

      const tabs = ["favorites", "payments", "reservations"];
      if (url.length === 2 && url[0].path === "me" && tabs.includes(url[1].path)) {
        return { consumed: url, posParams: { tab: url[1] } };
      }

      return null;
    },
    canActivate: [AuthGuard],
    resolve: {
      user: UserService,
    },
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
  },
];
