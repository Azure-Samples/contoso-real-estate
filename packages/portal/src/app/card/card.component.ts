import { Component, Input } from '@angular/core';
import { CardType } from 'src/typings/cardtype';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()
  listing!: CardType;

  constructor() { }

  ngOnInit(): void {
  }
}
