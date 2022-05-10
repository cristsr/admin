import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuffix',
})
export class ThousandSuffixPipe implements PipeTransform {
  transform(input: number, args?: any): string | number {
    const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    const exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
