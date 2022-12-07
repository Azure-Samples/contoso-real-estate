import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfilepageComponent implements OnInit {
  title = "Profile User Page"
  constructor() { }

  ngOnInit(): void { }

}
