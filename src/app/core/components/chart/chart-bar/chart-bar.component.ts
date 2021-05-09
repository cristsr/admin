import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ThousandSuffixesPipe } from '../../../pipes/thousand-suffixes/thousand-suffixes.pipe';
import { Chart } from 'chart.js';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chart-bar',
  template: `
    <canvas appChart [config]="config" (create)="onCreate($event)"></canvas>`,
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {
  @Input()
  get config(): any {
    return this.chartConfig;
  }

  set config(config: any) {
    // this.chartConfig = config;
    this.configureChart(config);
  }

  @Input()
    // @HostBinding('style.width')
  width: string;

  @Output() chartClick = new EventEmitter();

  chartConfig: ChartConfiguration<'bar'>;

  constructor(private thousandSuff: ThousandSuffixesPipe) {
  }

  configureChart(config: any): void {
    this.chartConfig = {
      type: 'bar',
      data: {
        labels: ['Nov 20', 'dic 20', 'Ene', 'Feb', 'Mar', 'Abr'],
        datasets: [
          {
            barThickness: 50,
            label: 'Ingresos',
            data: [1000000, 2000000, 6000000, 4000000, 3000000, 7000000],
            // backgroundColor: [
            //   'rgba(255, 99, 132 )',
            //   'rgba(255, 159, 64 )',
            //   'rgba(255, 205, 86 )',
            //   'rgba(75, 192, 192 )',
            //
            //   'rgba(153, 102, 255)',
            //   'rgba(201, 203, 207)'
            // ],
            backgroundColor: 'rgba(54, 162, 235 )',
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
            ticks: {
              callback: (value) => this.thousandSuff.transform(+value)
            },
            beginAtZero: true,
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

  onCreate(chart: Chart): void {
    fromEvent(window, 'resize').pipe(
      debounceTime(250),
      pluck('target', 'innerWidth'),
      startWith(window.innerWidth),
    ).subscribe(width => {
      const barThickness = width < 576 ? 20 : 50;
      chart.config.data.datasets.forEach((v: any) => v.barThickness = barThickness);
      chart.update();
    });
  }
}
