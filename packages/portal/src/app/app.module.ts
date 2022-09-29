import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
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
    CardComponent,
    CardListComponent,
    ListingDetailComponent,
    HeroStageComponent,
    HomepageComponent,
    RentalpageComponent,
    TextpageComponent,
    TextComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
