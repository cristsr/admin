import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash-es';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(str: string): string {
    if (!str) {
      return '';
    }
    return capitalize(str);
  }
}
