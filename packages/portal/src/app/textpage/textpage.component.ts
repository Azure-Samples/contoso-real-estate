import { Component, OnInit } from '@angular/core';
import { TextComponent
 } from './text/text.component';
@Component({
  selector: 'app-textpage',
  templateUrl: './textpage.component.html',
  styleUrls: ['./textpage.component.scss'],
  standalone: true,
  imports: [ TextComponent ]
})
export class TextpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
