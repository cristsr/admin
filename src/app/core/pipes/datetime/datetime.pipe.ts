import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'datetime',
})
export class DatetimePipe implements PipeTransform {
  transform(
    value: string,
    format: 'days' | 'weeks' | 'months' | 'years',
  ): string {
    if (format === 'days') {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED);
    }

    if (format === 'weeks') {
      const [year, month, week] = value.split('-');

      const date = DateTime.fromObject({
        year: Number(year),
        month: Number(month),
        // weekYear: Number(week),
      });

      const key = Object.keys(weekFormatMap).find((k) =>
        navigator.language?.includes(k),
      );

      const weekFormat = weekFormatMap[key || 'es'].replace('{week}', week);

      return `${weekFormat} ${date.toLocaleString({
        year: 'numeric',
        month: 'short',
      })}`;
    }

    if (format === 'months') {
      return DateTime.fromISO(value).toLocaleString({
        month: 'long',
        year: 'numeric',
      });
    }

    return DateTime.fromSQL(value).toLocaleString({
      year: 'numeric',
    });
  }
}

const weekFormatMap = {
  es: 'Semana {week} de',
  en: 'Week {week} of',
};
