import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-text-block",
  templateUrl: "./text-block.component.html",
  styleUrls: ["./text-block.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class TextBlockComponent {
  @Input() title = "";
}
