import { Component, OnInit } from '@angular/core';
import { StageType } from 'src/typings/';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  stage: StageType = {
    title: 'Welcome to the portal',
    subtitle: '',
    label: 'Visit our blog!',
    url: 'https://www.google.com',
    img: '/assets/images/pic-green.png'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
