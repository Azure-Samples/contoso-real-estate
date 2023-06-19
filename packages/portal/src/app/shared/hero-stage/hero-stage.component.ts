import { Component, Input } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";

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
