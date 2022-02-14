import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { pluck } from 'rxjs/operators';
import { LayoutService } from '../layout/layout.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private layoutService: LayoutService,
  ) {
    this.initializeTheme();
    this.listenThemeChanges();
  }

  initializeTheme(): void {
    console.log('called initialize theme');
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.layoutService.setTheme(theme);
    }
  }

  listenThemeChanges(): void {
    this.layoutService.state$.pipe(pluck('theme')).subscribe((theme) => {
      this.document.body.className = `${theme}-theme`;
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme(): void {
    this.layoutService.toggleTheme();
  }
}
