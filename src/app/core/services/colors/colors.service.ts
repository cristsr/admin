import { Inject, Injectable } from '@angular/core';
import { COLORS } from 'core/constants';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(@Inject(COLORS) private colors: Record<string, any>) {
    console.log('Colors', colors);
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

  getColors(): Record<string, any> {
    return this.colors;
  }
}
