import { Pipe, PipeTransform } from '@angular/core';
import { GroupMovement, Movement } from 'modules/finances/types';

@Pipe({
  name: 'groupMovement',
})
export class GroupMovementPipe implements PipeTransform {
  transform(movements: Movement[], ...args: unknown[]): GroupMovement[] {
    const groupedByDay = movements.reduce((map, curr) => {
      if (!map.has(curr.date)) {
        map.set(curr.date, []);
      }

      map.get(curr.date).push(curr);

      return map;
    }, new Map<string, Array<Movement>>());

    return [...groupedByDay.entries()].map(([date, values]) => ({
      date,
      accumulated: values.reduce((acc: number, { amount }) => acc + amount, 0),
      values,
    }));
  }
}
