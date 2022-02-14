import { Component, OnInit } from '@angular/core';
import { MovementOld } from 'core/interfaces/movementOld';

@Component({
  selector: 'app-movements-list',
  template: `
    <div class="date-group" *ngFor="let item of data | movement">
      <b>{{ item.date | date }}</b>
      <div class="item" *ngFor="let value of item.values">
        <mat-icon>favorite</mat-icon>
        <div class="column labels">
          <b>{{ value.category.name }}</b>
          <span>{{ value.description }}</span>
        </div>
        <span class="currency">{{120000 | currency}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./movements-list.component.scss']
})
export class MovementsListComponent implements OnInit {

  data: MovementOld[] = [
    {
      date: '11-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'testasdasdtestasdasd test test test',
      quantity: 130000
    },
    {
      date: '10-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'rest',
      quantity: 120000
    },
    {
      date: '10-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 8000
    },
    {
      date: '9-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 4000
    },
    {
      date: '9-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 120000
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
