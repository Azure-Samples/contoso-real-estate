import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RentalpageComponent } from './rentalpage/rentalpage.component';
import { TextpageComponent } from './textpage/textpage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'listing/:slug',
    component: RentalpageComponent
  },
  {
    path: 'tos',
    component: TextpageComponent
  },
  {
    path: 'about',
    component: TextpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
