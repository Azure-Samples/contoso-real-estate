import { Component, OnInit, Input } from '@angular/core';
import { StageType } from 'src/typings/stagetype';

@Component({
  selector: 'app-hero-stage',
  templateUrl: './hero-stage.component.html',
  styleUrls: ['./hero-stage.component.scss']
})
export class HeroStageComponent implements OnInit {
  @Input()
  stage!: StageType;

  constructor() { }

  ngOnInit(): void {
  }

}
