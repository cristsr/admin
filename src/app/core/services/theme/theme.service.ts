import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ColorsService } from 'core/services';
import { ThemeConfig } from 'layout/types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #current: string;
  #themeConfig: ThemeConfig[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private colors: ColorsService,
  ) {
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
      main: this.colors.getColorHue(name, main),
    }));
    console.log('themes', this.#themeConfig);
  }

  setTheme(theme: string): void {
    this.document.body.classList.forEach((className) => {
      if (this.themeConfig.some(({ name }) => name.includes(className))) {
        // Remove previous theme class
        this.document.body.classList.remove(className);
      }
    });

    // Add new theme class
    this.document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  private setThemeFromCache(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }
  }
}
