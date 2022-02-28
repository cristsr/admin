import { Component } from '@angular/core';
import { MovementOld } from 'core/interfaces/movementOld';

@Component({
  selector: 'app-movements-list',
  template: ``,
})
export class MovementsListComponent {
  data: MovementOld[] = [
    {
      date: '11-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico',
      },
      description: 'testasdasdtestasdasd test test test',
      quantity: 130000,
    },
    {
      date: '10-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico',
      },
      description: 'rest',
      quantity: 120000,
    },
    {
      date: '10-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico',
      },
      description: 'test',
      quantity: 8000,
    },
    {
      date: '9-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico',
      },
      description: 'test',
      quantity: 4000,
    },
    {
      date: '9-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico',
      },
      description: 'test',
      quantity: 120000,
    },
  ];

  constructor() {}
}
