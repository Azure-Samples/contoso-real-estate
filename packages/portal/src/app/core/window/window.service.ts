import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Window>('Browser Window', {
  providedIn: 'root',
  factory: () => window
});


@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(@Inject(BROWSER_STORAGE) public win: Window) { }

  nativeWindow(): Window {
    return this.win;
  }
}
