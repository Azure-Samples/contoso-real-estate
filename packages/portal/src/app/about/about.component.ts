import { Component } from "@angular/core";
import { TextBlockComponent } from "../shared/text-block/text-block.component";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  standalone: true,
  imports: [TextBlockComponent],
})
export class AboutComponent {
  title = "About";
}
