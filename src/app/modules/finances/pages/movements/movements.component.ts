import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Period, Movement, MovementFilter } from 'modules/finances/types';
import { filter, merge, pluck, Subject, takeUntil } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MovementService } from 'modules/finances/services';
import {
  MovementFormComponent,
  MovementFilterComponent,
} from 'modules/finances/components';
import {
  plusMonths,
  plusDays,
  weekRange,
  plusYears,
  formatDay,
  formatMonth,
  formatYear,
  formatInterval,
} from 'core/utils';
import { capitalize, isEqual } from 'lodash-es';
import { NavService } from 'layout/services';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter2 } from 'eventemitter2';
import { Events } from 'layout/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsComponent implements OnInit, OnDestroy {
  movements: Movement[];
  period: Period = 'day';
  dateIndex = 0;
  date: string;
  dateLabel: string;

  filterOptions: MovementFilter;

  #unsubscribeAll = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private eventEmitter: EventEmitter2,
    private navService: NavService,
    private movementService: MovementService,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
    this.setupListeners();

    this.navService.nextConfig({
      buttons: [
        {
          tag: 'filter',
          icon: 'filter_list',
        },
      ],
    });

    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
    // Remove buttons from nav
    this.navService.nextConfig({ buttons: [] });
  }

  setupObservers(): void {
    this.activatedRoute.data
      .pipe(pluck('data', 'filterOptions'), takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (data: MovementFilter) => {
          console.log('[MovementsComponent] filterOptions', data);
          this.filterOptions = data;
          this.period = data.period;
          this.updateDate();
        },
      });

    const movements = merge(
      this.activatedRoute.data.pipe(pluck('data', 'movements')),
      this.movementService.movements,
    );

    movements.pipe(takeUntil(this.#unsubscribeAll)).subscribe({
      next: (response: Movement[]) => {
        this.movements = response;
        this.cd.detectChanges();
        console.log('[MovementsComponent] movements', this.movements);
      },
    });

    this.navService.action
      .pipe(
        takeUntil(this.#unsubscribeAll),
        filter((action) => action === 'filter'),
      )
      .subscribe(() => {
        this.showMovementFilter();
      });
  }

  setupListeners() {
    this.eventEmitter.on(Events.BOTTOM_NAV_ACTION_DONE, () => {
      // If movement was created, fetch movements again
      this.updateDate();
      this.fetchMovements();
    });
  }

  showMovementFilter(): void {
    this.dialog
      .open(MovementFilterComponent, {
        data: this.filterOptions,
        maxWidth: '100%',
        panelClass: ['!p-6', 'w-full'],
      })
      .afterClosed()
      .subscribe((filterOptions: MovementFilter) => {
        if (!filterOptions) {
          return;
        }

        if (isEqual(filterOptions, this.filterOptions)) {
          return;
        }

        console.log('filterOptions', filterOptions);

        this.dateIndex = 0;
        this.filterOptions = filterOptions;
        this.period = filterOptions.period;
        this.updateDate();
        this.fetchMovements();
        this.cd.detectChanges();
      });
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet
      .open(MovementFormComponent, {
        data: {
          action: 'read',
          movement,
        },
      })
      .afterDismissed()
      .subscribe({
        next: (result) => {
          // If movement was updated, fetch movements again
          if (result) {
            this.updateDate();
            this.fetchMovements();
          }
        },
      });
  }

  fetchMovements(): void {
    const type = Object.entries(this.filterOptions.type)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(',');

    this.movementService.next({
      ...this.filterOptions,
      date: this.date,
      type,
    });
  }

  onBefore(): void {
    this.dateIndex--;
    this.updateDate();
    this.fetchMovements();
  }

  onNext(): void {
    this.dateIndex++;
    this.updateDate();
    this.fetchMovements();
  }

  onReset(): void {
    if (this.dateIndex === 0) {
      return;
    }

    this.dateIndex = 0;
    this.updateDate();
    this.fetchMovements();
  }

  updateDate(): void {
    if (this.period === 'day') {
      const date = plusDays(this.dateIndex);
      this.dateLabel = formatDay(date);
      this.date = date.toISODate();
      return;
    }

    if (this.period === 'week') {
      const interval = weekRange(this.dateIndex);
      this.dateLabel = formatInterval(interval);
      this.date = interval.toISODate();
      return;
    }

    if (this.period === 'month') {
      const date = plusMonths(this.dateIndex);
      this.dateLabel = capitalize(formatMonth(date));
      this.date = date.toFormat('yyyy-MM');
      return;
    }

    if (this.period === 'year') {
      const date = plusYears(this.dateIndex);
      this.dateLabel = formatYear(date);
      this.date = date.toFormat('yyyy');
    }
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
