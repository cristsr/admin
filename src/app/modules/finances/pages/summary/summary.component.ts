import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { SummaryService } from 'modules/finances/services';
import { Movement } from 'modules/finances/types';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  expenseView: 'daily' | 'weekly' | 'monthly' = 'daily';

  chartGender = {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'donut',
      sparkline: {
        enabled: true,
      },
    },
    colors: ['#319795', '#4FD1C5'],
    labels: ['Male', 'Female'],
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: '70%',
        },
      },
    },
    series: [55, 45],
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: 'dark',
      custom: ({ seriesIndex, w }): string => `
        <div class="flex items-center h-8 min-h-8 max-h-8 px-3">
           <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
           <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
           <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>
      `,
    },
  };

  pieOptions: ApexOptions;

  chartOptions: ApexOptions;

  balance: any;

  latestMovements: Movement[];

  private data: any;

  constructor(
    private decimalPipe: DecimalPipe,
    private summaryService: SummaryService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.summaryService.getSummary().subscribe({
      next: (response) => {
        this.data = response;
        this.balance = response.balance;
        this.latestMovements = response.latestMovements;
        this.configurePie();
        this.configureBar();
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onclick(event: any): void {
    console.log(event);
  }

  openDialog(): void {}

  configurePie(): void {
    const { pie } = this.data;

    const piePeriod = 'monthly';

    const [series, labels, colors] = pie[piePeriod].reduce(
      ([s, l, c], curr) => {
        s.push(curr.amount);
        l.push(curr.name);
        c.push('bg-' + curr.color);

        return [s, l, c];
      },
      [[], [], []],
    );

    this.pieOptions = {
      series,
      labels,
      chart: {
        type: 'donut',
        width: '100%',
        height: 280,
        stacked: true,
      },
      stroke: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
        },
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          // customScale: 0.8,
          expandOnClick: false,
          donut: {
            size: '72%',
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: -10,
                fontSize: '8px',
                color: '#000',
                formatter: (val: string): string => {
                  return val.charAt(0).toUpperCase() + val.slice(1);
                },
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: 'Open Sans',
                fontWeight: 500,
                formatter: (val: string): string => {
                  return '$'+ parseInt(val).toLocaleString();
                }
              },
              total: {
                show: true,
                color: '#000',
                label: 'Total',
                formatter: (val: any): string => {
                  return "$" + val.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString();
                }
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
    };
  }

  configureBar(): void {
    const { bar } = this.data;

    const [series, labels] = bar.reduce(
      ([s, l, c], curr) => {
        s.push(curr.amount);
        l.push(curr.day);
        return [s, l];
      },
      [[], []],
    );

    this.chartOptions = {
      series: [
        {
          name: 'Gastos',
          data: series,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        type: 'bar',
        background: 'white',
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false,
          },
        },
        sparkline: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ['#EF4444'],
      dataLabels: {
        textAnchor: 'middle',
        enabled: true,
        style: {
          colors: ['black'],
          fontSize: '10px',
        },
        offsetY: -18,
        // enabledOnSeries: [0],
      },
      fill: {
        colors: undefined,
        opacity: 0.4,
        type: 'solid',
      },
      grid: {
        show: false,
        borderColor: 'gray',
      },
      labels,
      legend: {
        show: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
          borderRadius: 5,
          // horizontal: false
          columnWidth: '50%',
        },
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75,
          },
        },
      },
      stroke: {
        curve: 'smooth',
        show: false,
        width: [6, 4],
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        theme: 'dark',
      },
      xaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
          color: 'green',
        },
        labels: {
          style: {
            colors: 'rgba(14,20,28,0.68)',
            fontWeight: 500,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
        axisBorder: {
          show: true,
        },
        labels: {
          // offsetX: -16,
          style: {
            colors: 'gray',
          },
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top',
                },
                // borderRadius: 5
                // horizontal: false
                // columnWidth: '50%'
              },
            },
          },
        },
      ],
    };
  }
}
