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
      "title": "Bright apartment close to the park",
      "city": "Edinburgh",
      "bedrooms": 3,
      "bathrooms": 3,
      "amenities": ["no furniture", "fireplace", "garden"],
      "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "img": "pic-salmon.png",
      "slug": {
        "$numberLong": "366801"
      }
    },
    {
      "title": "Luxurious house in the suburbs",
      "city": "Guangzhou",
      "bedrooms": 5,
      "bathrooms": 1,
      "amenities": ["laundry room", "furniture", "gym"],
      "description": "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      "img": "pic-salmon.png",
      "slug": {
        "$numberLong": "550298"
      }
    },
    {
      "title": "Luxurious house in the suburbs",
      "city": "Milan",
      "bedrooms": 3,
      "bathrooms": 1,
      "amenities": ["balcony", "sauna", "fireplace"],
      "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "img": "pic-green.png",
      "slug": {
        "$numberLong": "307462"
      }
    },
    {
      "title": "Art-deco loft close to the metro station",
      "city": "Tel Aviv",
      "bedrooms": 1,
      "bathrooms": 2,
      "amenities": ["furniture", "patio", "terrace"],
      "description": "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
      "img": "pic-orange.png",
      "slug": {
        "$numberLong": "657862"
      }
    },
    {
      "title": "Beautiful house in the countryside",
      "city": "New York",
      "bedrooms": 5,
      "bathrooms": 1,
      "amenities": ["wi-fi", "jacuzzi", "terrace"],
      "description": "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
      "img": "pic-purple.png",
      "slug": {
        "$numberLong": "328668"
      }
    },
    {
      "title": "Luxurious house in the suburbs",
      "city": "Paris",
      "bedrooms": 4,
      "bathrooms": 2,
      "amenities": ["no furniture", "furniture", "balcony"],
      "description": "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
      "img": "pic-bluegreen.png",
      "slug": {
        "$numberLong": "803384"
      }
    },
    {
      "title": "Spacious apartment for a young family",
      "city": "Johannesburg",
      "bedrooms": 2,
      "bathrooms": 1,
      "amenities": ["parking", "microwave", "air conditioning"],
      "description": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      "img": "pic-orange.png",
      "slug": {
        "$numberLong": "430000"
      }
    },
    {
      "title": "Modern apartment close to the metro station",
      "city": "Beijing",
      "bedrooms": 2,
      "bathrooms": 3,
      "amenities": ["gym", "air conditioning", "swimming pool"],
      "description": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      "img": "pic-yellowgreen.png",
      "slug": {
        "$numberLong": "121653"
      }
    },
    {
      "title": "Charming apartment close to the train station",
      "city": "Beijing",
      "bedrooms": 4,
      "bathrooms": 2,
      "amenities": ["laundry room", "microwave", "fireplace"],
      "description": "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
      "img": "pic-blue.png",
      "slug": {
        "$numberLong": "351150"
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
