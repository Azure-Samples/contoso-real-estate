import { Component, Input, OnInit } from '@angular/core';
import { TextBlockComponent } from '../shared/text-block/text-block.component';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss'],
  standalone: true,
  imports: [ TextBlockComponent ]
})
export class TosComponent implements OnInit {

  title = 'Terms of Service';
  constructor() { }

  ngOnInit(): void {
  }

}
