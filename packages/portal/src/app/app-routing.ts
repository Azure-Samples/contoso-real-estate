import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";

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
];
