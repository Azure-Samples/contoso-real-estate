import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss'],
  standalone: true,
  imports: [ 
    CommonModule,
    CardComponent
  ]
})
export class ListingDetailComponent implements OnInit {
  listing: any = {};
  navigation: Navigation | undefined;

  constructor(
    private router: Router
  ) {
    this.navigation = this.router.getCurrentNavigation() || undefined;
    this.listing = this.navigation?.extras.state?.['rental'];
  }

  ngOnInit(): void {
    console.log(this.listing, 'listing');
  }
}
