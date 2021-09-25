import { Pipe, PipeTransform } from '@angular/core';
import { FormatMovement, MovementOld } from '../../interfaces/movementOld';

@Pipe({
  name: 'movement'
})
export class MovementPipe implements PipeTransform {
  transform(movements: MovementOld[]): FormatMovement[] {
    return movements.reduce((state: FormatMovement[], current: MovementOld) => {
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
