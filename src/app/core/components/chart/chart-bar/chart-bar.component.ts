import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-bar',
  template: `<canvas appChart [config]="config"></canvas>`,
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {
  @Input()
  get config(): any {
    return this.chartConfig;
  }
  set config(config: any) {
    this.configureChart(config);
  }

  @Input()
  @HostBinding('style.width')
  width: string;

  @Output() chartClick = new EventEmitter();

  chartConfig: ChartConfiguration<'bar'>;

  configureChart(config: any): void {
    this.chartConfig = {
      type: 'bar',
      data: {
        labels: ['enero', 'febrero', 'marzo', 'abril'],
        datasets: [
          {
            barThickness: 20,
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
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
  }

  ngOnInit(): void {

  }
}
