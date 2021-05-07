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
        color: '#fc5c65'
      },
      {
        label: 'otra',
        value: 200001,
        color: '#fc5c65'
      }
    ],
    options: {
      hoverOffset: 0,
      cutout: 55,
      padding: 0,
      textCenter: false
    }
  };

  doughnut2 = {
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
        color: '#fc5c65'
      },
      {
        label: 'otra',
        value: 200001,
        color: '#fc5c65'
      }
    ],
    options: {
      hoverOffset: 0,
      cutout: 50,
      padding: 0,
      textCenter: false
    }
  };

  ngOnInit(): void {
  }

  onclick(event: any): void {
    console.log(event);
  }

}
