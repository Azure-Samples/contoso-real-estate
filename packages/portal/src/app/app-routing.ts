import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
  {
    path: "listing/:slug",
    loadComponent: () => import("./rentalpage/rentalpage.component").then(m => m.RentalpageComponent),
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
