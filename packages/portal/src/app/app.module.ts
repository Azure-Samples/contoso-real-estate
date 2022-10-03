import { NgModule } from '@angular/core';

import { CardListComponent } from './card-list/card-list.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { CardComponent } from './card/card.component';
import { HeroStageComponent } from './hero-stage/hero-stage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RentalpageComponent } from './rentalpage/rentalpage.component';
import { TextpageComponent } from './textpage/textpage.component';
import { TextComponent } from './text/text.component';
import { MainNavComponent } from './main-nav/main-nav.component';
@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    MainNavComponent,
    CardComponent,
    HeroStageComponent,
    TextComponent,
    ListingDetailComponent,
    CardListComponent,
    RentalpageComponent,
    TextpageComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
