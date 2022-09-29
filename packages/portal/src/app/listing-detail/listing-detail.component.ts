import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss']
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
