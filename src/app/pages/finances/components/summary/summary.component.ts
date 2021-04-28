import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  doughnut = {
    label: 'Ingresos',
    data: [
      {
        label: 'Sueldo',
        value: 3000000,
        color: '#26de81'
      },
      {
        label: 'Acciones',
        value: 300000,
        color: '#fed330'
      },
      {
        label: 'Acciones2',
        value: 200000,
        color: 'red'
      },
      {
        label: 'otra',
        value: 200001,
        color: 'red'
      }
    ],
    options: {
      hoverOffset: 0,
      cutout: 90,
      padding: 0
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  onclick(event: any): void {
    console.log(event);
  }
}
