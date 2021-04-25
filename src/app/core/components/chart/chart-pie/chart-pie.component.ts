import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-pie',
  template: `
    <canvas appChart [config]="config"></canvas>
    <div class="center">
      {{ '300000' | currency }}
    </div>
  `,
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
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

  chartConfig: any;

  constructor() { }

  configureChart(config: any): void {
    const labels = [... new Set(config.data.map(v => v.label))];
    const data =  [... new Set(config.data.map(v => v.value))];
    const backgroundColor = [... new Set(config.data.map(v => v.color))];

    this.chartConfig = {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: config.label,
          data,
          backgroundColor,
          hoverOffset: 6,
        },
        ]
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
          padding: config.options.cutout
        },
        onClick: (e, arr, chart) => {
          chart.getDatasetMeta(arr[0].datasetIndex);
          console.log(chart.getDatasetMeta(arr[0].datasetIndex));
          console.log(arr);
        }
      },
    };
    console.log(this.chartConfig);
  }

  ngOnInit(): void {
  }
}
