import { animationFrames, endWith, map, Observable, takeWhile } from 'rxjs';
import { NativeDateAdapter } from '@angular/material/core';
import { DateTime } from 'luxon';

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
