import { Injectable } from '@angular/core';
import * as Colors from 'tailwindcss/colors';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor() {
    console.log('ColorsService', Colors);
  }

  classToHex(cssClass: string): string {
    const split = cssClass.split('-');

    if (split.length === 2) {
      const [color, code] = split;
      return Colors[color][code];
    }

    if (split.length === 3) {
      const [_, color, code] = split;
      return Colors[color][code];
    }

    console.warn(`Could not convert ${cssClass} to hex`);

    return '';
  }
}
