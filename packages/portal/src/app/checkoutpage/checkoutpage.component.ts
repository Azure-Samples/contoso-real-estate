import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class CheckoutpageComponent implements OnInit {
  result: string = 'error';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.result = this.route.snapshot.queryParams['result'];
  }

}
