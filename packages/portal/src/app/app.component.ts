import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MainNavComponent } from "./shared/main-nav/main-nav.component";
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../app/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, MainNavComponent, MatToolbarModule, FormsModule, MatSlideToggleModule, CommonModule],
})
export class AppComponent implements OnInit{
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void{
    this.isDarkTheme = this.themeService.isDarkTheme();
  }
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setDarkTheme(this.isDarkTheme);
  }
}

