import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
  standalone: true
})
export class SearchpageComponent implements OnInit {

  async ngOnInit() {
    console.log('searchpage');
  }
}
