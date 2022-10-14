import { NgModule } from "@angular/core";

import { HomepageComponent } from "./homepage/homepage.component";
import { RentalpageComponent } from "./rentalpage/rentalpage.component";
import { CardListComponent } from "./shared/card-list/card-list.component";
import { CardComponent } from "./shared/card/card.component";
import { HeroStageComponent } from "./shared/hero-stage/hero-stage.component";
import { ListingDetailComponent } from "./shared/listing-detail/listing-detail.component";
import { MainNavComponent } from "./shared/main-nav/main-nav.component";
import { TextComponent } from "./textpage/text/text.component";
import { TextpageComponent } from "./textpage/textpage.component";
@NgModule({
  imports: [
    // BrowserAnimationsModule,
    MainNavComponent,
    CardComponent,
    HeroStageComponent,
    TextComponent,
    ListingDetailComponent,
    CardListComponent,
    RentalpageComponent,
    TextpageComponent,
  ],
})
export class AppModule {}
