import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initializeTheme();
    this.listenThemeChanges();
  }

  initializeTheme(): void {
    console.log('called initialize theme');
    const theme = localStorage.getItem('theme');
    if (theme) {
      console.log('theme is set', theme);
    }
  }

  listenThemeChanges(): void {
    of('').subscribe((theme) => {
      this.document.body.className = `${theme}-theme`;
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme(): void {}
}
