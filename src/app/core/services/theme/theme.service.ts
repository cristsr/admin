import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ColorsService } from 'core/services';
import { pick } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #theme = new BehaviorSubject('indigo');
  #themes = new ReplaySubject(1);
  #allowedThemes = new BehaviorSubject([
    'indigo',
    'blue',
    'amber',
    'emerald',
    'rose',
  ]);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private colors: ColorsService,
  ) {
    this.initializeTheme();
    this.configureThemes();
    this.setupObservers();
  }

  setupObservers(): void {
    this.#theme.asObservable().subscribe({
      next: (theme) => {
        // Remove previous theme class
        this.document.body.classList.forEach((className) => {
          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        });

        // Add new theme class
        this.document.body.classList.add(`theme-${theme}`);
        localStorage.setItem('theme', theme);
      },
    });
  }

  configureThemes(): void {
    const themes = pick(this.colors.getColors(), this.#allowedThemes.value);
    this.#themes.next(themes);
    console.log('themes', themes);
  }

  initializeTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }
  }

  get allowedThemes(): Observable<string[]> {
    return this.#allowedThemes.asObservable();
  }

  setTheme(theme: string): void {
    this.#theme.next(theme);
  }
}
