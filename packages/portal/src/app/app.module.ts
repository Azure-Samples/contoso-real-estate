import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AppComponent,
    CardListComponent,
    HomepageComponent,
    RentalpageComponent,
    TextpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainNavComponent,
    CardComponent,
    HeroStageComponent,
    TextComponent,
    ListingDetailComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
