import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [ 
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MainNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
