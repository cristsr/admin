import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  doughnut = {
    label: 'My First Dataset',
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
      cutout: 80,
      padding: 50
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  onclick(event: any): void {
    console.log(event);
  }
}
