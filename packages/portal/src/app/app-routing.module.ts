import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CardListComponent 
  },
  {
    path: 'listing/:slug',
    component: ListingDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
