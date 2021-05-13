import { Pipe, PipeTransform } from '@angular/core';
import { FormatMovement, Movement } from '../../interfaces/Movement';

@Pipe({
  name: 'movement'
})
export class MovementPipe implements PipeTransform {
  transform(movements: Movement[]): FormatMovement[] {
    return movements.reduce((state: FormatMovement[], current: Movement) => {
      const {date, ...item} = current;
      const exist = state.find(v => v.date === date);

      if (exist) {
        exist.values.push(current);
        return state;
      }

      state.push({
        date,
        values: [item]
      });

      return state;
    }, []);
  }
}
