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
      cutout: 110,
      padding: 0
    }
  };

  bar2 = {
    type: 'bar',
    data: {
      labels: ['Noviembre', 'diciembre', 'enero', 'febrero', 'marzo', 'abril'],
      datasets: [
        {
          barThickness: 25,
          label: 'My First Dataset',
          data: [3000000, 300000, 2678000, 3000000, 3000000, 300000, 150000],
          backgroundColor: [
            'rgba(255, 99, 132 )',
            'rgba(255, 159, 64 )',
            'rgba(255, 205, 86 )',
            'rgba(75, 192, 192 )',
            'rgba(54, 162, 235 )',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)'
          ],
          borderColor: 'transparent',
          borderWidth: 1
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true
        }
      },
      onClick: (e, arr, chart) => {
        console.log([e, arr, chart]);
      }
    },
  };

  ngOnInit(): void {
  }

  onclick(event: any): void {
    console.log(event);
  }

}
