import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Scheme, ThemeConfig } from 'layout/types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #currentTheme: string = 'blue';
  #scheme: Scheme;
  #themeConfig: ThemeConfig[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.#currentTheme = this.getDefaultTheme();
    this.#scheme = this.getDefaultScheme();
    this.setThemeFromCache();
    this.setSchemeFromCache();
  }

  get currentTheme(): ThemeConfig {
    return this.#themeConfig?.find(({ color }) => color === this.#currentTheme);
  }

  get themeConfig(): ThemeConfig[] {
    return this.#themeConfig;
  }

  get scheme(): Scheme {
    return this.#scheme;
  }

  configureThemes(config: ThemeConfig[]): void {
    this.#themeConfig = config.map(({ color, hue }) => ({
      color: color,
      hue: [color, '-', hue].join(''),
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
    this.#currentTheme = theme;
  }

  setScheme(scheme: Scheme): void {
    if (scheme === 'dark') {
      this.document.body.classList.remove('light');
      this.document.body.classList.add('dark');
    }

    if (scheme === 'light') {
      this.document.body.classList.remove('dark');
      this.document.body.classList.add('light');
    }

    localStorage.setItem('scheme', scheme);
    this.#scheme = scheme;
  }

  private setThemeFromCache(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }
  }

  private setSchemeFromCache(): void {
    const scheme = <Scheme>localStorage.getItem('scheme');
    if (scheme) {
      this.setScheme(scheme);
    }
  }

  private getDefaultTheme(): string {
    const { classList } = this.document.body;

    for (let i = 0; i < classList.length; i++) {
      const className = classList[i];
      if (className.startsWith('theme-')) {
        return className.split('theme-')[1];
      }
    }
  }

  private getDefaultScheme(): Scheme {
    const { classList } = this.document.body;

    for (let i = 0; i < classList.length; i++) {
      const className = classList[i];
      if (className.includes('light')) {
        return 'light';
      }
    }

    return 'dark';
  }
}
