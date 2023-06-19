import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-hero-stage",
  templateUrl: "./hero-stage.component.html",
  styleUrls: ["./hero-stage.component.scss"],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class HeroStageComponent {
  @Input()
  stage!: StageType | null;
}
