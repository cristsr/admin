import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, Subject, takeUntil, merge } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { EventEmitter2 } from 'eventemitter2';
import { Events } from 'layout/constants';
import {
  Balance,
  CategoryExpense,
  Expense,
  ExpensePeriod,
  Expenses,
  Movement,
  Summary,
} from 'modules/finances/types';
import { SummaryService } from 'modules/finances/services';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  @ViewChild('expenseChart') pieChartRef: ChartComponent;

  pieOptions: ApexOptions;
  chartOptions: ApexOptions;
  expensePeriod: ExpensePeriod = 'daily';
  balance: Balance;
  expenses: Expenses;
  categoryExpenses: CategoryExpense[];
  lastMovements: Movement[];

  #unsubscribeAll = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private summaryService: SummaryService,
    private eventEmitter: EventEmitter2,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupPieChart();
    this.setupObservers();
    this.setupListeners();
  }

  setupPieChart(): void {
    this.pieOptions = {
      series: [],
      labels: [],
      colors: [],
      chart: {
        type: 'donut',
        width: '100%',
        height: 240,
        stacked: true,
      },
      stroke: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '10px',
          // fontWeight: 'bold',
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
            size: '75%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '8px',
                color: '#000',
                formatter: (val: string): string => {
                  return val.charAt(0).toUpperCase() + val.slice(1);
                },
              },
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: 'bold',
                fontFamily: 'Open Sans',
                formatter: (val: string): string => {
                  return '$' + parseInt(val, 10).toLocaleString();
                },
              },
              total: {
                show: true,
                color: '#000',
                label: 'Total',
                formatter: (val: any): string => {
                  if (!this.categoryExpenses?.length) {
                    return '$0';
                  }

                  const total = val.globals.seriesTotals.reduce(
                    (a, b) => a + b,
                    0,
                  );

                  return '$' + total.toLocaleString();
                },
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
      },
    };
  }

  setupObservers(): void {
    // Merge observables into one
    const summarySource = merge(
      this.activatedRoute.data.pipe(pluck('data')),
      this.summaryService.summary(),
    ).pipe(takeUntil(this.#unsubscribeAll));

    // Subscribe to summary data when data is resolved or updated
    summarySource.subscribe({
      next: (data: Summary) => {
        console.log('Summary data', data);
        this.balance = data.balance;
        this.expenses = data.expenses;
        this.lastMovements = data.movements;
        this.updatePieChart();
        this.cd.detectChanges();
      },
    });
  }

  setupListeners(): void {
    // Fetch data again
    this.eventEmitter.on(Events.BOTTOM_NAV_ACTION_DONE, () => {
      console.log('Fetching data again');
      this.summaryService.next();
    });
  }

  async updatePieChart(): Promise<void> {
    const expense: Expense = this.expenses[this.expensePeriod];
    this.categoryExpenses = expense.categoryExpenses;

    if (!this.pieChartRef) {
      // Hack to avoid error when chart is not ready
      await this.cd.detectChanges();
    }

    if (!this.categoryExpenses.length) {
      await this.pieChartRef.updateOptions({
        series: [1],
        labels: [],
        colors: ['#e3e3e3'],
        stroke: { show: false },
      });
      return;
    }

    await this.pieChartRef.updateOptions({
      ...expense.chart,
      stroke: {
        show: true,
      },
    });
  }

  changeExpenseView(view: 'daily' | 'weekly' | 'monthly'): void {
    this.expensePeriod = view;
    this.updatePieChart();
    this.cd.detectChanges();
  }

  showCategoryMovements(i: CategoryExpense) {
    return;
  }

  configureBar(): void {
    const { bar } = { bar: [] };

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
