import { animationFrames, endWith, map, Observable, takeWhile } from 'rxjs';
import { NativeDateAdapter } from '@angular/material/core';
import { DateTime, Interval } from 'luxon';
import { DateTimeFormatOptions } from 'luxon/src/misc';

export function isNotNullOrUndefined(val: any): boolean {
  return val !== null && val !== undefined;
}

export function translateAnimationFrame(
  start: number,
  end: number,
  duration: number,
): Observable<number> {
  const diff = end - start;

  return animationFrames().pipe(
    // Figure out what percentage of time has passed
    map(({ elapsed }) => elapsed / duration),
    // Take the vector while less than 100%
    takeWhile((v) => v < 1),
    // Finish with 100%
    endWith(1),
    // Calculate the distance traveled between start and end
    map((v) => v * diff + start),
  );
}

/**
 * Converts a date to a legible string
 */
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  }
}

export function plusDays(days: number): DateTime {
  return DateTime.now().plus({ days });
}

export function weekRange(weeks): any {
  const local = DateTime.local();

  const start = local.startOf('week').plus({ weeks });
  const end = local.endOf('week').plus({ weeks });

  return Interval.fromDateTimes(start, end);
}

export function plusMonths(months): any {
  const local = DateTime.local();

  return local.startOf('month').plus({ months });
}

export function plusYears(years): any {
  const local = DateTime.local();

  return local.startOf('year').plus({ years });
}

export function formatDay(day: DateTime): string {
  return day.toLocaleString(DateTime.DATE_FULL);
}

export function formatDate(date: DateTime): string {
  const day = date.toFormat('dd');
  const month = date.toLocaleString({ month: 'short' });
  const year = date.toFormat('yyyy');

  return `${day} ${month} ${year}`;
}

export function formatInterval(interval: Interval): string {
  const start = formatDate(interval.start);
  const end = formatDate(interval.end);

  return `${start} - ${end}`;
}

export function formatMonth(date: DateTime): string {
  const formatOpts: DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleString(formatOpts);
}

export function formatYear(date: DateTime): string {
  const formatOpts: DateTimeFormatOptions = {
    year: 'numeric',
  };
  return date.toLocaleString(formatOpts);
}
