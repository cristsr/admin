import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-pie',
  template: `
    <canvas appChart [config]="config"></canvas>
    <div class="center">
      <span>Total</span>
      <h4>{{ '300000' | currency }}</h4>
    </div>
  `,
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent {
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

  chartConfig: ChartConfiguration<'doughnut'>;

  configureChart(config: any): void {
    this.chartConfig = {
      type: 'doughnut',
      data: {
        labels: config.data.map(v => v.label),
        datasets: [{
          label: config.label,
          data: config.data.map(v => v.value),
          backgroundColor: config.data.map(v => v.color),
          hoverOffset: config.options.hoverOffset,
        }]
      },
      options: {
        borderColor: 'transparent',
        cutout: config.options.cutout,
        plugins: {
          legend: {
            display: false,
          },
        },
        layout: {
          padding: config.options.padding
        },
        onClick: (e, arr, chart) => {
          this.onChartClick([e, arr, chart]);
        }
      },
    };
  }

  onChartClick(e): void {
    console.log(e);
  }
}
