import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { Movement, GroupMovement } from 'modules/finances/types';

const formatKeys = {
  day: 'yyyy-MM-dd',
  week: 'yyyy-WW-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
};

@Pipe({
  name: 'groupBy',
  pure: false,
})
export class GroupByPipe implements PipeTransform {
  transform(
    value: Array<Movement>,
    range: 'day' | 'week' | 'month' | 'year',
  ): GroupMovement[] {
    // group by day or week or month or year in order of key provided
    const grouped = value.reduce((state, current) => {
      const date = DateTime.fromISO(current.date);

      const dateKey = date.toFormat(formatKeys[range]);

      if (!state[dateKey]) {
        state[dateKey] = [];
      }

      state[dateKey].push(current);

      return state;
    }, {});

    const result = Object.entries<Movement[]>(grouped).map(
      ([key, movements]) => ({
        group: key,
        accumulated: movements.reduce((acc, curr) => acc + curr.amount, 0),
        values: movements,
      }),
    );

    console.log(result);

    return result;
  }
}
