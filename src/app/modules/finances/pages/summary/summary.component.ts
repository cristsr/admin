import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, merge } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
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
import { EventEmitterService } from 'core/services';
import { MovementFormComponent } from 'modules/finances/components';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit, OnDestroy {
  @ViewChild('expenseChart') pieChartRef: ChartComponent;

  pieOptions: ApexOptions;
  chartOptions: ApexOptions;
  expensePeriod: ExpensePeriod = 'day';
  balance: Balance;
  expenses: Expenses;
  categoryExpenses: CategoryExpense[];
  lastMovements: Movement[];
  #unsubscribeAll = new Subject<void>();

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private emitter: EventEmitterService,
    private summaryService: SummaryService,
  ) {}

  ngOnInit(): void {
    const { data } = this.activatedRoute.snapshot.data;
    this.setupPieChart();
    this.setupProperties(data);
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  setupProperties(data: Summary) {
    this.balance = data.balance;
    this.expenses = data.expenses;
    this.lastMovements = data.movements;
    this.updatePieChart().then();
    this.cd.detectChanges();
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
    // Subscribe to summary data when reload is requested
    this.summaryService
      .summary()
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (data: Summary) => {
          console.log('[SummaryComponent] data', data);
          this.setupProperties(data);
        },
      });

    merge(
      this.emitter.on('movement:created'),
      this.emitter.on('movement:updated'),
    )
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe(() => {
        console.log('[SummaryComponent] fetching data again');
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
        labels: [''],
        colors: ['#e3e3e3'],
        stroke: { show: false },
      });
      return;
    }

    await this.pieChartRef.updateOptions({
      ...expense.chart,
      stroke: { show: true },
    });
  }

  changeExpenseView(view: ExpensePeriod): void {
    this.expensePeriod = view;
    this.updatePieChart().then();
    this.cd.detectChanges();
  }

  showCategoryMovements(data: CategoryExpense) {
    this.router.navigate(['/finances/movements'], {
      queryParams: {
        category: data.category.id,
        period: this.expensePeriod,
      },
    });
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet.open(MovementFormComponent, {
      data: {
        action: 'read',
        movement,
      },
    });
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
