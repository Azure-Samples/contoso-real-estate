import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { StageType } from 'src/typings/stagetype';
import { HeroStageComponent } from '../hero-stage/hero-stage.component';
import { ListingDetailComponent } from '../listing-detail/listing-detail.component';

@Component({
  selector: 'app-rentalpage',
  templateUrl: './rentalpage.component.html',
  styleUrls: ['./rentalpage.component.scss'],
  standalone: true,
  imports: [ 
    HeroStageComponent, 
    ListingDetailComponent
  ]
})
export class RentalpageComponent implements OnInit {
  listing: any;
  stage!: StageType;
  navigation: Navigation | undefined;

  constructor(
    private router: Router
  ) {
    this.navigation = this.router.getCurrentNavigation() || undefined;
    this.listing = this.navigation?.extras.state?.['rental'];
    this.stage = {
      title: this.listing?.city,
      subtitle: this.listing?.subtitle || '',
      label: this.listing?.label || 'See more',
      // this url could lead to a query for more rentals in the city where this listing is located
      url: this.listing?.url || '#',
      img: this.listing.img
    };
  }

  ngOnInit(): void {
    console.log(this.listing, 'listing');
  }
}
