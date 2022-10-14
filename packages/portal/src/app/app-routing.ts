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
    loadComponent: () => import("./textpage/textpage.component").then(m => m.TextpageComponent),
  },
  {
    path: "about",
    loadComponent: () => import("./textpage/textpage.component").then(m => m.TextpageComponent),
  },
];
