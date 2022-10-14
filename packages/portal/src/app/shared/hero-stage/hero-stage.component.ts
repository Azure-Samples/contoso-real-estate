import { Component, OnInit, Input } from '@angular/core';
import { StageType } from 'src/typings/';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-stage',
  templateUrl: './hero-stage.component.html',
  styleUrls: ['./hero-stage.component.scss'],
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ]
})
export class HeroStageComponent implements OnInit {
  @Input()
  stage!: StageType;

  constructor() { }

  ngOnInit(): void {
  }

}
