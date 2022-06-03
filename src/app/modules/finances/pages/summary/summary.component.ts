import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { SummaryService } from 'modules/finances/services';
import {
  Balance,
  CategoryExpense,
  Expense,
  ExpensePeriod,
  Expenses,
  Movement,
} from 'modules/finances/types';
import { DecimalPipe } from '@angular/common';
import { ColorsService } from 'core/services';

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

  private data: any;

  constructor(
    private decimalPipe: DecimalPipe,
    private summaryService: SummaryService,
    private colorService: ColorsService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupPieChart();
    this.setupObservers();
  }

  setupObservers(): void {
    this.summaryService.balance().subscribe({
      next: (balance: Balance) => {
        this.balance = balance;
        this.cd.markForCheck();
      },
    });

    this.summaryService.expenses().subscribe({
      next: (expenses: Expenses) => {
        this.expenses = expenses;
        this.updatePieChart();
        this.cd.detectChanges();
      },
    });

    this.summaryService.lastMovements().subscribe({
      next: (movements: Movement[]) => {
        this.lastMovements = movements;
        this.cd.markForCheck();
      },
    });
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

  updatePieChart(): void {
    // this.expenses.weekly.categoryExpenses = [];
    // this.expenses.weekly.chart = {
    //   series: [],
    //   labels: [],
    //   colors: [],
    // };

    const expense: Expense = this.expenses[this.expensePeriod];
    this.categoryExpenses = expense.categoryExpenses;

    if (!this.categoryExpenses.length) {
      this.pieChartRef.updateOptions({
        series: [1],
        labels: [],
        colors: ['#e3e3e3'],
        stroke: { show: false },
      });
      return;
    }

    if (this.pieChartRef) {
      this.pieChartRef.updateOptions({
        ...expense.chart,
        stroke: { show: true },
      });
    }
  }

  changeExpenseView(view: 'daily' | 'weekly' | 'monthly'): void {
    this.expensePeriod = view;
    this.updatePieChart();
    this.cd.detectChanges();
  }

  toggleDataPointSelection(_i: number): void {
    if (this.pieChartRef) {
      console.log(this.pieChartRef);
      // this.expenseChart.toggleDataPointSelection(i);
      // this.cd.detectChanges();
    }
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
