import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from 'core/constants';
import { COLORS } from 'layout/constants';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    @Inject(COLORS) private colors: Record<string, any>,
  ) {}

  get properties(): Record<string, string> {
    return {
      default: this.window
        .getComputedStyle(this.document.body)
        .getPropertyValue('--text-default'),

      primary: this.window
        .getComputedStyle(this.document.body)
        .getPropertyValue('--primary-main'),

      secondary: this.window
        .getComputedStyle(this.document.body)
        .getPropertyValue('--text-secondary'),
    };
  }

  classToHex(cssClass: string): string {
    const split = cssClass.split('-');

    if (split.length === 2) {
      const [color, code] = split;
      return this.colors[color][code];
    }

    if (split.length === 3) {
      const [_, color, code] = split;
      return this.colors[color][code];
    }

    console.warn(`Could not convert ${cssClass} to hex`);

    return '';
  }
}
