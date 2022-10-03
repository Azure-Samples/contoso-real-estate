import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  standalone: true,
  imports: [ CommonModule ]
})
export class TextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
