import { Component, Input } from '@angular/core';
import { Listing } from 'src/typings/';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [ MatCardModule ]
})
export class CardComponent {
  @Input()
  listing!: Listing;

  constructor() { }

  ngOnInit(): void {
  }
}
