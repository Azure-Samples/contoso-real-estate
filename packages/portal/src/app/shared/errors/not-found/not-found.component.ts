import { Component, OnInit } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [MatCardModule],
  standalone: true,
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
