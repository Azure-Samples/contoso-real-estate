import { Component, OnInit } from '@angular/core';
import { CardType } from '../../typings/cardtype';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  data  =  [
    {
      "title": "Practical loft downtown",
      "city": "Cologne",
      "bedrooms": 2,
      "bathrooms": 1,
      "amenities": ["parking", "jacuzzi", "wi-fi"],
      "img": "pic-bluegreen.png",
      "slug": {
        "$numberLong": "488008"
      }
    },
    {
      "title": "Bright apartment close to the park",
      "city": "London",
      "bedrooms": 2,
      "bathrooms": 3,
      "amenities": ["laundry room", "wi-fi", "furniture"],
      "img": "pic-pink.png",
      "slug": {
        "$numberLong": "160979"
      }
    },
    {
      "title": "Spacious apartment for a young family",
      "city": "Charlotte",
      "bedrooms": 1,
      "bathrooms": 3,
      "amenities": ["wi-fi", "dishwasher", "laundry room"],
      "img": "pic-pink.png",
      "slug": {
        "$numberLong": "190731"
      }
    },
    {
      "title": "Spacious house in the suburbs",
      "city": "Tokyo",
      "bedrooms": 4,
      "bathrooms": 3,
      "amenities": ["balcony", "no furniture", "heating"],
      "img": "pic-purple.png",
      "slug": {
        "$numberLong": "434170"
      }
    }
  ];
 
  listings: CardType[] = this.data || [];
  noresults: string = "There are no listings right now. Come back again soon!";
  siteUrl = window.location;

  constructor() { }

  ngOnInit(): void {
    console.log(this.siteUrl, "listings");
  }

}
