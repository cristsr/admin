import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeConfig } from 'layout/types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #current: string;
  #themeConfig: ThemeConfig[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setThemeFromCache();
  }

  get current(): ThemeConfig {
    return this.#themeConfig.find(({ name }) => name === this.#current);
  }

  get themeConfig(): ThemeConfig[] {
    return this.#themeConfig;
  }

  configureThemes(config: ThemeConfig[]): void {
    this.#themeConfig = config.map(({ name, main }) => ({
      name,
      main: [name, '-', main].join(''),
    }));
    console.log('themes', this.#themeConfig);
  }

  setTheme(theme: string): void {
    this.document.body.classList.forEach((className) => {
      if (className.startsWith('theme-')) {
        // Remove previous theme class
        this.document.body.classList.remove(className);
      }
    });

    // Add new theme class
    this.document.body.classList.add('theme-' + theme);
    localStorage.setItem('theme', theme);
    this.#current = theme;
  }

  private setThemeFromCache(): void {
    console.log('[ThemeService] setThemeFromCache', this.#current);
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }
  }
}
