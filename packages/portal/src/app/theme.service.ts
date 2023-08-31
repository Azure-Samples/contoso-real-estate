import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  private readonly themeKey = 'selectedTheme';

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem(this.themeKey, isDarkTheme ? 'dark' : 'light');
  }

  isDarkTheme(): boolean {
    const storedTheme = localStorage.getItem(this.themeKey);
    return storedTheme === 'dark';
  }

}

